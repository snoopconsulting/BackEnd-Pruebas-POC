# servicio springboot - jpa - hibernate - springdata -mysql

## Creacion de la base de datos y configuracion de las properties
   - La app esta utilizando el mysql y orm hibernate, pudiendo esto ser configurado desde las properties
   en el paquete resources
   - Crear la base de datos y utilizando el script sql que se encuentra en el paquete resources
   crear la entidad
   - Configurar las properties del archivo application.properties con el user, password y nombre que le dio a la
   base de datos que creo con anterioridad
   - Al ejecutar la app desde su ide deberia conectarse sin problema a la bd y podra probar el servicio en cualquier
   consola rest como por ejemplo postman desde el navegador, siempre pasando los parametros de un registro de la bd
                                                                        existente en la base de datos 
   - Para reaizar la prueba chequee la url donde expone el servicio en los controladores 