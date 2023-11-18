import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit{
  
  
  edadEstudiante = 20;
  carreraEstudiante = 'Ingeniería Informática';
  user: any;

  constructor(private userService: UsersService, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user:any) => {
      this.user = user;
    
      console.log(user);
    });
  }


  ngOnInit(): void {
    this.userService.usuarioActual$.subscribe(usuario => {
      this.user = usuario;
      console.log('Usuario actual:', this.user);
    });
  }

  logout(){
    this.userService.logout();
  }
  cambiarPass(){
    this.userService.actualizarPass(this.user.email);
    this.userService.presentAlert("Correo enviado", "Revisa tu correo");
  }

  tomarAsistencia(){
    this.userService.asistencia({sala: '251',seccion: '001d',ramo:'Diseño web'}, 'Lucas Orellana1')
  }
  
}
