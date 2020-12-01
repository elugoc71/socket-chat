var params = new URLSearchParams(window.location.search);

var nombre = params.nombre;
var sala = params.sala;

//referencias de jQuery
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');
var txtSala = $('#txtSala');
var txtBuscar = $('#txtBuscar');
var formBuscar = $('#formBuscar');

//Funcion para modificar el titulo del chat
//function rederizarTitulo() {
//    var html = '';

//    html += '<h3 a href="javascript:void(0)" class="box-title">Sala de chat <small>' + params.get('sala') + '</small></a></h3>';

//    divTitulo.html(bodyHtml);
//}


//Funcion para buscar usuario
function renderizarPersona(personas) {
    console.log('buscarpersona', personas);
    var htmlstring = '';

    htmlstring += '<h3 class="box-title">Sala de chat <small>' + params.get('sala') + '</small></h3>';
    txtSala.html(htmlstring);

    var html = '';



    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (var i = 0; i < personas.length; i++) {
        html += '<li>';
        html += '<a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/' + personas[i].nombre + '.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + '<small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuarios.html(html);

}


//Funciones para renderizar usuarios
function renderizarUsuarios(personas) {
    console.log('renderizacionusuarios', personas);
    var htmlstring = '';

    htmlstring += '<h3 class="box-title">Sala de chat <small>' + params.get('sala') + '</small></h3>';
    txtSala.html(htmlstring);

    var html = '';



    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (var i = 0; i < personas.length; i++) {
        html += '<li>';
        html += '<a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/' + personas[i].nombre + '.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + '<small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuarios.html(html);
}

//renderizar mensajes
function renderizarMensajes(mensaje, yo) {

    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();
    var adminClass = 'info';

    if (mensaje.nombre === 'Administrador') {
        adminClass = 'danger';
    }

    if (yo) {
        html += '<li class="reverse">';
        html += '<div class="chat-content">';
        html += '<h5>' + mensaje.nombre + '</h5>';
        html += '<div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '</div>';
        html += '<div class="chat-img"><img src="assets/images/users/' + mensaje.nombre + '.jpg" alt="user" /></div>';
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li>';

    } else {


        html += '<li class ="animated fadeIn">';

        if (mensaje.nombre !== 'Administrador') {
            html += '<div class="chat-img"><img src="assets/images/users/' + mensaje.nombre + '.jpg" alt="user" /></div>';
        }

        html += '<div class="chat-content">';
        html += '<h5>' + mensaje.nombre + '</h5>';
        html += '<div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
        html += '</div>';
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li>';
    }

    divChatbox.append(html);
}



//Funcion para mover el scroll bar
function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}



//Listeners
divUsuarios.on('click', 'a', function() {

    var id = $(this).data('id');
    if (id) {
        console.log(id);
    }
});

formEnviar.on('submit', function(e) {
    e.preventDefault();

    if (txtMensaje.val().trim().length === 0) {
        return;
    }

    // Enviar información
    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val()
    }, function(mensaje) {
        txtMensaje.val('').focus();
        renderizarMensajes(mensaje, true);
        scrollBottom();
    });
});

formBuscar.on('submit', function(e) {
    e.preventDefault();

    if (txtBuscar.val().trim().length === 0) {
        return;
    }

    // Buscar información
    socket.emit('buscarPersona', {
        buscar: txtBuscar.val()
    }, function(buscar) {
        renderizarPersona(buscar);
        //        scrollBottom();
    });
});