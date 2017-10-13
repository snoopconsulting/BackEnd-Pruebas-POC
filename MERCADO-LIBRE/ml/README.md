# API MERCADO LIBRE
- Api docs: http://developers.mercadolibre.com/api-docs/

## Tecnologias
- El proyecto esta creado con java y springBoot y utiliza un apache tomcat embebido como servidor
- Ide Intellij 


## Configuracion de la aplicacion
- Registrar una aplicacion en mercado libre bajo una cuenta valida para obtener: client_id y secret_id
Ir a este link y seguir los pocos pasos: http://developers.mercadolibre.com/es/registra-tu-aplicacion/
importante cuando creas tu aplicacion es colocarle el scope offline_access (que servira para obtener el refresh token)
Estos datos los utilizremos para completar el fichero de configuracion application.properties

### Autorizacion server side
- Otener access token, teniendo en cuenta que los token tiene una
duracion de 6 horas
Ir a este link y seguir los pocos pasos: http://developers.mercadolibre.com/es/autenticacion-y-autorizacion/
¡Obtén tu access_token!
Introduzca el ID de la aplicación que acaba de crear y obtendras el token que te servira para obtener el 
refreshToken y el code
- Obten code y refreshTpken siguiendo los pasos de este link: http://developers.mercadolibre.com/es/server-side/
Una vez que obtengas el code y el refreshToken podras completar el fichero properties del proyecto
- Atencion, recuerda que tienes que completar tambien las properties en el fichero de test para poder realizar las poruebas
Tambien deberas crear items de test en este link: http://developers.mercadolibre.com/start-testing/
- Con el id del item podras completar las properties de test para hacer pruebas

## Servicios expuestos
- Este proyecto muestra la implementacion de 4 servicios que una vez corriendo la aplicacion
podremos probarlos desde una consola rest como postman y tambien tendremos los test

### Descripcion 
- getProducto: ver item publicado: http://localhost:8080/producto/{idItem}

- publishItem: publicar un nuevo item bajo mi cuenta: //localhost:8080/producto/publish
Tener en cuenta que en el body de la peticion enviaremos un json con el formato de item valido

- pusblishQuestion: hacer pregunta a otro usuario sobre algun item:  http://localhost:8080/question/ask/{id-item}
Tener en cuenta que en body de la peticion se envia tambien un json con id de item y la pregunta

- receivedQuestions: ver todas las preguntas que recibimos: http://localhost:8080/question/view/received

### Algunas url disponibles en la api mercado libre
- ver id de un usuario por su nickname: https://api.mercadolibre.com/sites/MLA/search?nickname=nick_name
- ver informacion de un usuario por su id: https://api.mercadolibre.com/users/id_user
- ver mi informacion: https://api.mercadolibre.com/users/me?access_token=token






