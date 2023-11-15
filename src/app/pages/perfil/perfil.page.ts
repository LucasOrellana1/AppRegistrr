import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  
  
  edadEstudiante = 20;
  carreraEstudiante = 'Ingeniería Informática';
  user: any;

  constructor(private userService: UsersService, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user:any) => {
      this.user = user;
    
      console.log(user);
    });
  }
  
  logout(){
    this.userService.logout();

  }

  cambiarPass(){
    this.userService.actualizarPass("lu.orellana@duocuc.cl");
    alert("Correo enviado");
  }

  tomarAsistencia(){
    this.userService.asistencia({sala: '251',seccion: '001d',ramo:'Diseño web'}, 'Lucas Orellana1')
  }
  
}
