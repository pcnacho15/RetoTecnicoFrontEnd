import { Component, OnInit } from '@angular/core';
import { Jugador } from 'src/app/models/Jugador/Jugador';
import { JugadorService } from 'src/app/services/jugador.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {
  jugadores:Jugador[] = [];
  constructor(private jugadorService:JugadorService) { }

  ngOnInit(): void {
    //Se traen los jugadores que han entrado a participar al juego
    this.jugadorService.listadoJugadores().subscribe(
      (data:any)=>{
        this.jugadores = data;
      }
    );
  }



}
