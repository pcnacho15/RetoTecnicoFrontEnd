import {Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Jugador } from 'src/app/models/Jugador/Jugador';
import {Ronda} from 'src/app/models/Ronda/ronda';
import {RondaService} from 'src/app/services/ronda/ronda.service';
import Swal from 'sweetalert2';
import { Cuestionario } from 'src/app/models/Cuestionario/cuestionario';
import { JugadorService } from 'src/app/services/jugador.service';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.css']
})
export class CuestionarioComponent implements OnInit {
  Ronda: Ronda;
  Opciones: any[] = [];
  Usuario: any;
  PremioAcumuado:any = 0;
  constructor(private rondaService: RondaService, private ruta:Router, private jugadorService:JugadorService) {
    this.Ronda = new Ronda();
  }

  ngOnInit(): void {

    //Se obtiene el valor acumulado del premio de las rondas jugadas
    this.PremioAcumuado += JSON.parse(localStorage.getItem('premio') || '0')

    //Se envia es numero de la ronda para escoger una pregunta aleatoria en la función escoger ronda
    this.escogerRonda(JSON.parse(localStorage.getItem('ronda') || '1'));
    
  }

  //Se escoge una valor random de la lista de preguntas, de acuerdo al numero de ronda
  escogerValorRandom(Lista: any[]) {
    let rand = Math.floor(Math.random() * Lista.length);
    let rValue = Lista[rand];
    return rValue
  }

  //Se escoge la ronda aleatoriamente
  escogerRonda(ronda:number) {
    if (localStorage.getItem('username')) {
      this.Usuario = localStorage.getItem('username');
      this.rondaService.verRonda(ronda).subscribe((ronda: any) => {
        this.Ronda = this.escogerValorRandom(ronda);
        this.rondaService.obtenerOpciones(this.Ronda.id_pregunta).subscribe((opciones: any) => {
          this.Opciones = opciones
          let opcion = {
            opcion: this.Ronda.respuesta
          }
          this.Opciones.push(opcion);
          this.Opciones = this.Opciones.sort(() => {
            return Math.random() - 0.5
          });
        });
      });
    }
  }

  //Se valida que la respuesta sea correcta
  vaidarRespuesta(respuesta: string) {
    if (this.Ronda.respuesta === respuesta) {
      Swal.fire({
        icon: 'success',
        title: '¡Felicidades!',
        text: 'Has respondido correctamente',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: '#339900',
        confirmButtonText: `Continuar a la siguiente`,
        denyButtonText: `Salirme con ${this.PremioAcumuado + this.Ronda.premio}$`,
      }).then((result) => {
        if (result.isConfirmed) {
          let rondaActual = JSON.parse(localStorage.getItem('ronda') || '1') + 1;
          let sumaPremio = this.Ronda.premio + JSON.parse(localStorage.getItem('premio') || '0');
          localStorage.setItem('premio', JSON.stringify(sumaPremio));
          localStorage.setItem('ronda', JSON.stringify(rondaActual));
            if (rondaActual > 5) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Felicidad, terminaste el juego, ganaste',
                showConfirmButton: false,
                timer: 1500
              });
              this.guardarCuestionario();
              this.jugadorService.eliminarTokens();
              setTimeout(() => {
                this.ruta.navigateByUrl('/home');
              }, 2000);
            }else{
              location.reload();
            }
        } else if (result.isDenied) {
          if (!localStorage.getItem('premio')) {
            localStorage.setItem('premio', JSON.stringify(this.Ronda.premio));
          }else{
            let premio = this.PremioAcumuado + this.Ronda.premio;
            localStorage.setItem('premio', JSON.stringify(premio));
          }
          this.retirarse()
          
          this.jugadorService.eliminarTokens();
          //this.ruta.navigate(['/home']);
        }
      })
    } else {
      localStorage.setItem('premio', JSON.stringify(0));
      Swal.fire({
        title: 'Respuesta incorrecta',
        text: "Vuelve pronto",
        icon: 'error',
        showCancelButton: false,
        cancelButtonColor: '#d33',
      });
      this.retirarse();
    }
  }

  //El jugador se retira del juego con el acumulado acutal
  retirarse(){
    let jugador:Jugador = new Jugador();
    jugador.id_jugador = JSON.parse(localStorage.getItem('id')|| '1');
    jugador.premio = JSON.parse(localStorage.getItem('premio') || '0');

    this.guardarCuestionario();
    this.jugadorService.actualizarPremio(jugador).subscribe();
    this.jugadorService.eliminarTokens();
    this.ruta.navigate(['/home']);
  }

  //Se guarda el intento de participación del usuario
  guardarCuestionario(){
    let id_jugador:number = JSON.parse(localStorage.getItem('id')|| '1');
    let premio = JSON.parse(localStorage.getItem('premio') || '0');
    let cuestionario:Cuestionario = new Cuestionario()
    cuestionario.fecha_participa = new Date();
    cuestionario.id_jugador = id_jugador;
    cuestionario.premioObtenido = premio;
    this.rondaService.insertarParticipacion(cuestionario).subscribe()
  }

}
