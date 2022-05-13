//Esta clase se crea para crear objetos de tipo jugador y así poder manipular su información
export class Jugador{
    id_jugador:number;
    nombre:string;
    apellido:string;
    premio:number;

    constructor(){
        this.id_jugador =0;
        this.nombre = "";
        this.apellido = "";
        this.premio = 0;
    }
}