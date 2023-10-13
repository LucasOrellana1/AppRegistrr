import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import{
  FormControl,
  Validators,
  FormBuilder,
  FormGroup
} from '@angular/forms';

import { RegistroserviceService, Usuario } from 'src/app/services/login/registroservice.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  usuarios!: any;
  formularioLogin : FormGroup;

  constructor( 
    private alterController: AlertController,
    private navController: NavController,
    private registroServicie: RegistroserviceService,
    private fb: FormBuilder) { 
      this.formularioLogin = this.fb.group({
        'correo' : new FormControl("", Validators.required),
        'password' : new FormControl("", Validators.required),
      })
                }

  ngOnInit() {
  }

  async Ingresar(){
    var f = this.formularioLogin.value;
    var a = 0;
    this.registroServicie.getUsuarios().then(datos =>{
      this.usuarios=datos;
/*       if (datos.length==0)
      {
        return null;
      }
 */
      for(let obj of this.usuarios){
        if (obj.correoUsuario == f.correo && obj.passUsuario == f.password){
          a=1
          console.log('ingresado');
          localStorage.setItem('ingresado', 'true');
          this.navController.navigateRoot('inicio');
        }
      }
      console.log(a);
      if (a==0){
        this.alertMsg();
      }
    });
  }

  async alertMsg(){
    const alert = await this.alterController.create({
      header: 'Error...',
      message: '!Los datos ingresados no son correctos',
      buttons: ['Aceptar'],
    });
      await alert.present();
      return;
  }

}