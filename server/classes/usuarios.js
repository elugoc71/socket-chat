class Usuarios {
    constructor() {
        this.personas = []; //inicializar un arreglo de personas conectadas al chat
    }

    //metodo agregarPersona
    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala }; //creo un objeto que contiene id y nombre
        this.personas.push(persona); //agrego la persona al arreglo que se genero en el constructor
        return this.personas; //devuelvo a todas las personas
    }

    //metodo para regresar a una persona
    getPersona(id) {
        let persona = this.personas.filter(persona => {
            return persona.id === id
        })[0]; //con filter extraigo el id que busco y con [0] regreso el primero que encuentre aunque en teoria solo es 1

        return persona; //si hay persona regresa una si no regresa un undefine
    }

    getPersonas() {
        return this.personas; //regresa a todas las personas
    }

    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => {
            return persona.sala === sala;

        });
        return personasEnSala;
    }

    borrarPersona(id) { //para borrar una persona necesito en un bucle reconstruir el arreglo eliminando la persona

        //para poder indicar quien es la persona que se fue hay que recuperarla
        let personaBorrada = this.getPersona(id);

        this.personas = this.personas.filter(persona => {
            return persona.id != id
        });

        return personaBorrada;
    }
}

module.exports = { //exportar la clase para poder usarle en otros archivos
    Usuarios: Usuarios
}