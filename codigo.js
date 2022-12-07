class TicketManager {
    static generatorId = 0;
    #precioBaseDeGanancia = 1.15;
    constructor () {
        this.eventos = [{}];  
    }
    getEventos() {
        return this.eventos;
    }
    agregarEvento(nombre, lugar, precio, capacidad, fecha) {
        const capacity = capacidad ?? 50;
        const date = fecha ?? new Date().toLocaleDateString();
        TicketManager.genertorId++;
        const newEvent = {
            id: TicketManager.generatorId,
            nombre,
            lugar,
            precio: precio * this.#precioBaseDeGanancia,
            capacity,
            date,
            participants: []
            };
            this.eventos.push(newEvent);
        }

    agregarUsuario(idEvento, idUsuario) {
        const eventoEncontrado = this.eventos.find(evento => evento.id === idEvento)
        if(!eventoEncontrado){console.error("Evento no encontrado"); return;}
        const usuarioRegistrado = eventoEncontrado.participants.incudes(idUsuario);
        if (usuarioRegistrado){console.error("el usuario ya esta registrado")}
        eventoEncontrado.participantes.push(idUsuario);
    }
    ponerEventoEnGira(idEvento, nuevaLocalidad, nuevaFecha){
        const eventoEncontrado = this.eventos.find(evento => evento.id === idEvento)
        if(!eventoEncontrado){console.error("Evento no encontrado"); return;}
        TicketManager.genertorId++;
        const nuevoEvento = {
        ...eventoEncontrado,
        id:TicketManager.genertorId,
        lugar: nuevaLocalidad,
        fecha: nuevaFecha
    };
    this.eventos.push(nuevoEvento);
    }
}