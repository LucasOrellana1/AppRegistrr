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
}
