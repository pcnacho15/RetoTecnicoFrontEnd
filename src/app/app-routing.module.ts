import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuestionarioComponent } from './components/cuestionario/cuestionario.component';
import { HomeComponent } from './components/home/home.component';
import { MiParticipacionComponent } from './components/mi-participacion/mi-participacion.component';
import { UsuarioGuard } from './guards/usuario.guard';


const routes: Routes = [
  {path:'home', component:HomeComponent},                 //Se restringe la lógica del guard
  {path:'cuestionario', component:CuestionarioComponent, canActivate:[UsuarioGuard]},
  {path:'participaciones', component:MiParticipacionComponent, canActivate:[UsuarioGuard]},
  {path:'**', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
