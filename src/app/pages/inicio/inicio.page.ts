import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  
  nombreEstudiante = this.user.getEstudiante().displayName;
  correoEstudiante = this.user.getEstudiante().email;
  edadEstudiante = 20;
  carreraEstudiante = 'Ingeniería Informática';
 
  constructor(private user: UsersService) {
    
   }

  async logout(){
    this.user.logout();

  }
  


}
