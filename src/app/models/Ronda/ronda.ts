//Esta clase nos sirve para crear objetos de tipo Ronda y así poder manipular el juegos

export class Ronda {
  num_ronda: number;
  premio: number;
  id_pregunta:number;
  pregunta: string; 
  dificultad:number;
  nombre_categoria: string;
  id_respuesta: number;
  respuesta: string;

  constructor() {
    this.num_ronda=0;
    this.premio=0;
    this.id_pregunta=0;
    this.pregunta="";
    this.dificultad=0;
    this.nombre_categoria="";
    this.id_respuesta=0;
    this.respuesta="";
  }


}
