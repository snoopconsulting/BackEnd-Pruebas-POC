var requester = require('request');
var fs = require('fs');
var path = require('path');

const config = require('../../../config/config');
const CustomMessage = require('../../../config/message-resources');

function postImage(groupId, data) {
    return new Promise((resolve, reject) => {

        const url = config.facebook.url + groupId + '/photos' + config.facebook.token;

        var req = requester.post(url, function (err, res, body) {
            if (err) reject(err);

            var response = JSON.parse(body);

            if (response.error) {
                reject({
                    message: CustomMessage.photo.fail.uploadPhoto,
                    response: response
                })
            }

            resolve({
                message: CustomMessage.photo.success.uploadPhoto,
                response: response
            })
        });

        var form = req.form();

        //agrego propiedades al request
        form.append('message', data.message);
        if(data.hasOwnProperty('url')){
            form.append('source', requester(data.url));
        }else{
            form.append('source', fs.createReadStream(path.join(config.path.public.photo + data.fileName + "." + data.extension)));
        }

    })

}


module.exports = {
    postImage
};