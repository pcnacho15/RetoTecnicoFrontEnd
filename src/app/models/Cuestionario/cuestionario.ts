//Esta clase se crea para obtener objetos de los intentos hechos por los jugadores
export class Cuestionario{
    fecha_participa:Date;
    premioObtenido:number;
    id_jugador:number;
    constructor(){
        this.fecha_participa = new Date();
        this.premioObtenido = 0;
        this.id_jugador = 0;
    }
}