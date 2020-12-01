const { io } = require('../server');
//tengo que hacer uso de la clase usuarios
const { Usuarios } = require('../classes/usuarios.js');
const { crearMensaje } = require('../utilidades/utilidades.js');

//genero una instancia de la clase Usuarios

const usuarios = new Usuarios();

//backend
io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => { //recibo del frontend los datos del usuario y los despliegon en consola

        console.log('data en entrarChat', data);
        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'el nombre/sala es necesario'
            });
        }

        client.join(data.sala);

        //como ya se que vienen datos entonces agrego el nombre a personas
        let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala);


        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${data.nombre} se unio`));
        //console.log('Las que estan', personas);
        //return personas;

        callback(usuarios.getPersonasPorSala(data.sala));

    });


    //Permitir que el servidor escuche los mensajes
    client.on('crearMensaje', (data, callback) => {

        //como yo puedo obtener los datos de la pesona con getPersona entonces
        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

        callback(mensaje);
    });


    //Buscar una persona
    client.on('buscarPersona', (data, callback) => {

        //como yo puedo obtener los datos de la pesona con getPersona entonces
        //let persona = usuarios.getPersona(client.id);

        //let mensaje = crearMensaje(persona.nombre, data.mensaje);
        //client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

        callback(mensaje);
    });





    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salio`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));
    });

    client.on('mensajePrivado', (data) => {


        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });

});