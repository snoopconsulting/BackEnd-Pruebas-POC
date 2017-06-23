
# FACEBOOK GRAPH

Esta aplicacion esta basada en NODE JS

Para instalarla ejecutar

```
npm install
```
Para iniciar localmente

```
node app.js
```


## EndPoints Disponibles

### Photo
```
URL: http://localhost:port/api/photo/upload/url/:groupId
METHOD: POST
```
en el body se le pasa los parametros `message` y `url`
carga una imagen en un grupo a traves de una URL.

```
URL: http://localhost:port/api/photo/upload/locale/:groupId
METHOD: POST
```
en el body se le pasa los parametros `message`, `fileName` y `extension`
carga una imagen en un grupo a traves de un archivo local guardado dentro del proyecto (public/imagen).

### Post 

```
URL: http://localhost:port/api/post/upload/:groupId
METHOD: POST
```
en el body se le pasa los parametros `message` y `link` ( opcional )
carga una un nuevo post dentro de un grupo, si se le pasa una URL dentro de un link genera un enlace al mismo.

### Video
Actualmente fuera de servicio por parte de facebook

```
URL: http://localhost:port/api/video/upload/url/:groupId
METHOD: POST
```
en el body se le pasa los parametros `message` y `url`
carga un video en un grupo a traves de una URL.

```
URL: http://localhost:port/api/video/upload/locale/:groupId
METHOD: POST
```
en el body se le pasa los parametros `message`, `fileName` y `extension`
carga un video en un grupo a traves de un archivo local guardado dentro del proyecto (public/video).

