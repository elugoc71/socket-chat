var socket = io();

//frontend

//Hay que pasarle los datos por parametro desde la web para hacer una prueba
var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html' //si no viene se redirecciona al index para que la persona se registre
    throw new Error('El nombre/sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};


socket.on('connect', function() {
    console.log('Conectado al servidor');
    //necesito avisar quien soy yo

    socket.emit('entrarChat', usuario, function(resp) { //resp es un callback

            console.log(resp);
        }) //emito el nombre del usuario, el cual viene de params.get
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
//socket.emit('enviarMensaje', {
//    usuario: 'Fernando',
//    mensaje: 'Hola Mundo'
//}, function(resp) {
//    console.log('respuesta server: ', resp);
//});

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});
//Escuchar cambios de usuarios
//parea reiniciar el arreglo
//cuando el usuario entra o sale del chat
socket.on('listaPersona', function(personas) {

    console.log(personas);

});

//mensaje privado
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje Privado:', mensaje);
});