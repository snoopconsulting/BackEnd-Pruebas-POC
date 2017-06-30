# Node API REST

Proyecto de prueba para busqueda de datos harcodeados para `APP Nav Ticket` y utilizacion de la dependencia `node-zendesk`

Para instalarl ejecutar
```
npm install
```

Para iniciar localmente
```
node app.js
```

## Metodos usados de node-zendesk


### Tickets 

Crear un nuevo Ticket
```
client.tickets.create(ticket, callback(err, status, result)))
```

buscar un ticket
```
client.tickets.show(req.params.id, callback(err, status, ticket))
```

actualizar un ticket
```
client.tickets.update(ticketId, ticket, callback(err, status, resutlado))
```

Elimina un ticket
```
client.tickets.delete(ticketId, callback(err))
```

ver todos los tickets
```
client.tickets.list(ticketId, callback(err, status, result))
```

Ver todos los mensajes de un ticket
```
client.ticketaudits.list(ticketId, callback(err, req, result)
```

### Macros 

Crear un nuevo macro
```
client.macros.create(customMacro, callback(err, status, macro))
```

Aplicar un macro sobre un ticket
```
client.macros.applyTicket(ticketId, callback(err, status, result))
```

eliminar un macro
```
client.macros.delete(macroId, callback(err, status))
```

### Usuarios

Ver todos los usuarios
```
client.users.show(usuarioId, callback(err, status, result))
```

crear un nuevo usuario
```
client.users.create(user, callback(err, req, result))
```

Buscar un usuario (Se puede utilizar un query para campos personalizados `var query = "dni:34534332"`
```
client.users.search(query, callback(usuario))
```
