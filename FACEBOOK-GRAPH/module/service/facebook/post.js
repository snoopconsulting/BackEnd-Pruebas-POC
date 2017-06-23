var requester = require('request');
var fs = require('fs');

const config = require('../../../config/config');
const CustomMessage = require('../../../config/message-resources');

function postInGroup(groupId, data) {

    return new Promise((resolve, reject) => {

        const url = config.facebook.url + groupId + '/feed' + config.facebook.token;

        var req = requester.post(url, function (err, res, body) {
            if (err) reject(err);
            var response = JSON.parse(body);
            if (response.error) {
                reject({
                    message: CustomMessage.post.fail.uploadPhoto,
                    response: response
                })
            }
            resolve({
                message: CustomMessage.post.success.uploadPhoto,
                response: response
            })
        });

        var form = req.form();

        if(!data.hasOwnProperty('message') ) reject(CustomMessage.post.missingProperty.message);
        if(data.message.length == 0) reject(CustomMessage.post.validation.message);

        //agrego propiedades al request
        form.append('message', data.message);
        if(data.hasOwnProperty('link')) form.append('link', data.link);

    })

}

module.exports = {
    postInGroup
};