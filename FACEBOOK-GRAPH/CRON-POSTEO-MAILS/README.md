# CRON POSTEO MAILS EN WORKSPACE

## Instalación

### Instalar las dependencias npm

```
npm install
```

### Configuracion de Google service to service

Esta URL proporciona un mini tutorial para la correcta configuracion de las credenciales de google 
```
https://snoopconsultingcom.facebook.com/groups/1960204887565162/1969587063293611/
```

### Configuracion del proyecto

Se debe modificar el archivo `config.js` que se encuentra dentro de la carpeta `config`.

- En `google.configuracion` se debe setear los parametros obtenidos de `Google Service to Service`.

- En `drive.folders` se debe crear previamente 2 carpetas y colocar sus id correspondiente.

- En `postMailGroupId` de debe colocar el mail que recibira informacion y el grupo de workplace donde se enviara `email:grupo`.

- En `mailPermission` se podra configurar los dominios que aceptara la aplicacion, para prevenir spam externo.

- En `cron` se modificara la franja horaria de donde esta corriendo la app ( en este caso es Argentina) y los tiempos de ejecucion del mismo.

- En `imap` se agregaran las diferentes cuentas de GMAIL donde se obtendran los correos

### Para iniciar localmente
```
node app.js
```

## Modo de uso

este proyecto es un cron que corre cada cierto tiempo sobre una cuenta de gmail, cada vez que en esa cuenta recibe un mail
automaticamente lo postea sobre un grupo especifico en workspace.

Es una aplicacion escalable, se puede configurar con varias cuentas y grupos para automatizar.

para probar se puede enviar un mail a `maxilopez2223@gmail.com` el mensaje sera posteado en el grupo Snoop Pruebas.

## Caracteristicas

Se podran mandar todo tipo de correo, dependiendo el caso, la aplicacion respondera de manera distinta.

### Formato de correo

- Solo Texto: se enviara todo el contenido en un solo posteo de texto plano al grupo especifico.

- Texto y una imagen: se enviara la imagen con el texto plano en un solo posteo al grupo especifico.

- Texto y un archivo: se enviara el texto plano adjunto un link de google drive donde estara cargado el archivo al grupo especifico.

- Texto y varios imagenes y/o archivos: se posteara por separado el texto plano, las imagenes y los archivos.

