import { Component, OnInit } from '@angular/core';
import { ParticipacionService, participacion } from 'src/app/services/participacion.service';

@Component({
  selector: 'app-mi-participacion',
  templateUrl: './mi-participacion.component.html',
  styleUrls: ['./mi-participacion.component.css']
})
export class MiParticipacionComponent implements OnInit {
  misParticipaciones:participacion[] = [];
  constructor(private participacionService:ParticipacionService) { }

  ngOnInit(): void {
    this.verParticipacion();
  }

  verParticipacion(){
    let id = JSON.parse(localStorage.getItem('id') || '1');
    //Se obtinen los intentos realizados por el jugador cuya sesión esté iniciada
    this.participacionService.verParticipacion(id).subscribe(
      (data:any)=>{
        this.misParticipaciones = data;
      }
    );
  }



}
