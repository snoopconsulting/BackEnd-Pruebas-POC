var requester = require('request');
var fs = require('fs');
var path = require('path');

const config = require('../../../config/config');
const CustomMessage = require('../../../config/message-resources');

function postVideo(groupId, data) {
    return new Promise((resolve, reject) => {

        const url = config.facebook.url + groupId + '/videos' + config.facebook.token;

        var req = requester.post(url, function (err, res, body) {
            if (err) reject(err);

            var response = JSON.parse(body);

            if (response.error) {
                reject({
                    message: CustomMessage.video.fail.uploadPhoto,
                    response: response
                })
            }

            resolve({
                message: CustomMessage.video.success.uploadPhoto,
                response: response
            })
        });

        var form = req.form();

        //agrego propiedades al request
        form.append('message', data.message);
        if(data.hasOwnProperty('url')){
            form.append('source', requester(data.url));
        }else{
            form.append('source', fs.createReadStream(path.join(config.path.public.video + data.fileName + "." + data.extension)));
        }

    })

}


module.exports = {
    postVideo
};