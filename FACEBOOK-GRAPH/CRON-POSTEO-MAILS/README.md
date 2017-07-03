# CRON POSTEO MAILS EN WORKSPACE

## Instalación

Instalar las dependencias npm
```
npm install
```

Para iniciar localmente
```
node app.js
```

## Modo de uso

este proyecto es un cron que corre cada 1 minuto sobre una cuenta de gmail, cada vez que en esa cuenta recibe un mail
automaticamente lo postea sobre un grupo especifico en workspace.

Es una aplicacion escalable, se puede configurar con varias cuentas y grupos para automatizar.

para probar se puede enviar un mail a `maxilopez2223@gmail.com` el mensaje sera posteado en el grupo Snoop Pruebas 

