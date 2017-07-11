var logRepository = require('../../repository/log/log-repository');
var functionUtil = require('../../utils/function-utils');
var message = require('../../utils/message-utils');

function deleteOldsLogs() {
    return new Promise((resolve, reject) => {
        var lastSevenDay = functionUtil.getLast7days();
        logRepository.getAllLogName()
            .then(arrayLogs => {
                for (let day of arrayLogs) {
                    if (lastSevenDay.indexOf(day) === -1) {
                        logRepository.deleteLog(day)
                            .then(message.log.successDelete)
                            .catch(err => reject(message.log.failDelete, err))
                    }
                }
            })
            .catch(reject)
    })
}

function insertLog(data) {
    return new Promise((resolve, reject) => {
        logRepository.writeOrCreateLog(data)
            .then(resolve)
            .catch(reject)
    })
}

module.exports = {
    deleteOldsLogs,
    insertLog
};