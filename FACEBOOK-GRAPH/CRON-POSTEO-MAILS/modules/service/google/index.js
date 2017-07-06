var fs = require('fs');

var googleServicesAouth = require('./oauth/google-oauth');
var googleServicesFile =require('./files/google-file');


// resource: {
//   title: 'nueva imagen2',
//   mimeType: 'image/jpg',
//   parents: [{id: '0B5GMXmDIkPM6TlE3OGQ0YmxSTDQ'}]
//  }
//  media: {
//   mimeType: 'image/jpg',
//   body: file
//  }
//  const file = fs.createReadStream(path.join('public/imagen/55ac20c170922.jpg'));



function uploadImagen(fileName, extension, file, folder) {
    return new Promise((resolve, reject) =>{
            googleServicesAouth.authorize().then(oauth =>{
                googleServicesFile.upload(oauth, fileName, extension, file, folder)
                    .then(response => resolve(response))
                    .catch(err => reject(err))
            })

    })
}

module.exports = {
    uploadImagen
};



