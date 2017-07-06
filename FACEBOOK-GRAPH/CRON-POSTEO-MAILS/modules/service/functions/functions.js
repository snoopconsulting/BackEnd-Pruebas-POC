var requester = require('request');


function buildUrlDrive(archive) {

    return new Promise((resolve, reject) =>{


        var urlArray = archive.webContentLink.split('&export=download');
        var url = urlArray[0];

        console.log(url)

        requester.get(url, function (err, res) {
            //console.log(res)
        })


    })



}

module.exports = {
    buildUrlDrive
}