var requester = require('request');

const config = require('../../config/config');


function postInWorkSpace(groupId, data) {

    return new Promise((resolve, reject) =>{

        const url = config.facebook.url + groupId + '/feed' + config.facebook.token;

        var req = requester.post(url, function (err, res, body) {
            if (err) reject(err);
            resolve(body)
        });

        var form = req.form();

        form.append('message', data);

    })

}

module.exports = {
    postInWorkSpace
};