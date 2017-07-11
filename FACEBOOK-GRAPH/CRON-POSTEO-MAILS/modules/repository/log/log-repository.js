var fs = require('fs');
var path = require('path');
var moment = require('moment');

var appDir = path.dirname(require.main.filename);
var dirLogs = appDir + '/logs/';

function getAllLogName() {
    return new Promise((resolve, rejected) => {
        fs.readdir(dirLogs, function (err, filesPath) {
            if (err) rejected(err);
            var files = filesPath.map(function (filePath) {
                return filePath;
            });
            resolve(files)
        });
    })
}

function readLog(logName) {
    return new Promise((resolve, rejected) => {
        fs.readFile(dirLogs + logName, "utf8", function (err, content) {
            if (err) rejected(err);
            resolve(content)
        });
    })
}

function deleteLog(logName) {
    return new Promise((resolve, rejected) => {
        fs.unlink(dirLogs + logName, function (err, content) {
            if (err) rejected(err);
            resolve(content)
        });
    })
}

function writeOrCreateLog(data) {
    return new Promise((resolve, reject) => {
        var dateNowInHour = moment().format('HH:mm:ss');
        var dateNow = moment().format('DD MM YYYY');
        var textToInsert = "HORA: " + dateNowInHour + '\r\n' + data + '\r\n' + ''  + '\r\n';

        fs.appendFile(dirLogs + dateNow, textToInsert , function (err) {
            if(err) reject(err);
            resolve()
        });
    })
}

module.exports = {
    getAllLogName,
    readLog,
    deleteLog,
    writeOrCreateLog
};