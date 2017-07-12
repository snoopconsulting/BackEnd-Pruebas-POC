var requester = require('request');

const config = require('../../../config/config');
var validate = require('../../utils/validate-utils');

function postImage(groupId, data, urlImagen) {
    return new Promise((resolve, reject) => {
        const url = config.facebook.url + groupId + '/photos' + config.facebook.token;
        const form = {
            message: data,
            url: urlImagen
        };
        requester.post({url, form}, function (err, res, body) {
            if(err) reject(err);
            resolve(body)
        })
    })
}


function postPlainTextAndLink(groupId, data, link) {

    return new Promise((resolve, reject) => {
        const form = {
            message: data
        };
        if (!validate.isNullOrEmptyOrUndefined(link)) form['link'] = link;
        const url = config.facebook.url + groupId + '/feed' + config.facebook.token;
        requester.post({url, form}, function (err, res, body) {
            if (err) reject(err);
            resolve(body);
        });

    })

}

module.exports ={
    postImage,
    postPlainTextAndLink
};