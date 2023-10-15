import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { RegisterPage } from 'src/app/pages/register/register.page';

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
        'correo' : new FormControl("",[Validators.required,
          Validators.email, 
          RegisterPage.noEspaciosValidator]),

        'password' : new FormControl("", Validators.required),
      })
};

get correo(){
  return this.formularioLogin.get('correo');
}

get password(){
  return this.formularioLogin.get('password');
}

 

  async Ingresar(){
    var f = this.formularioLogin.value;
    var a = 0;
    this.registroServicie.getUsuarios().then(datos =>{
      this.usuarios=datos;
     if (datos == null)
      {
        this.alertMsgP("Error" ,"No hay cuentas almacenadas");
        return null;
      }
 
      for(let obj of this.usuarios){
        if (obj.correoUsuario == f.correo && obj.passUsuario == f.password){
          a=1
          console.log('ingresado');
          localStorage.setItem('ingresado', 'true');
          localStorage.setItem('nombre', obj.nomUsuario);
          localStorage.setItem('correo', obj.correoUsuario);

          console.log(obj.esProf);
          //Añade un key de profesor
          if(obj.esProf === 'true'){
            localStorage.setItem('esProf', 'true');
          }

          this.alertMsgP('Bienvenido', obj.nomUsuario);
          this.navController.navigateRoot('inicio');
        }
      }
      console.log(a);
      if (a==0){
        this.alertMsg();
      }
    
      return null;
    });
    
  }
  

  async alertMsg(){
    const alert = await this.alterController.create({
      header: 'Error...',
      message: '!Los datos ingresados no son correctos o no existen',
      buttons: ['Aceptar'],
    });
      await alert.present();
      return;
  }

  async alertMsgP(header : string , msg: string){
    const alert = await this.alterController.create({
      header: header,
      message: msg,
      buttons: ['Aceptar'],
    });
      await alert.present();
      return;
  }
  ngOnInit() {
  }
}