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



function uploadImagen(resource, media) {
    return new Promise((reject, resolve) =>{
            googleServicesAouth.authorize().then(oauth =>{
                googleServicesFile.uploadImagen(oauth, resource, media)
                    .then(response => resolve(response))
                    .catch(err => reject(err))
            })

    })
}

module.exports = {
    uploadImagen
};



