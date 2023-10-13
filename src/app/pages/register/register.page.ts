
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { RegistroserviceService, Usuario } from 'src/app/services/login/registroservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formularioRegistro: FormGroup;
  newUsuario: Usuario= <Usuario>{};

  constructor(private registroService: RegistroserviceService,
              private alertController: AlertController,
              private toastController: ToastController,
              private fb:FormBuilder) {
                this.formularioRegistro = this.fb.group({
                  'nombre' : new FormControl("", Validators.required),
                  'correo' : new FormControl("", Validators.required),
                  'password' : new FormControl("", Validators.required),
                  'confirmPass' : new FormControl("", Validators.required)
            });
               }

  ngOnInit() {
  }

  async CrearUsuario(){
      //console.log('Guardar');
    var form= this.formularioRegistro.value;
    if (this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos Imcompletos',
        message: 'Debe completar todos los  datos',
        buttons: ['Aceptar'],
      });

      await alert.present();
      return;
    }

    this.newUsuario.nomUsuario = form.nombre,
    this.newUsuario.correoUsuario = form.correo,
    this.newUsuario.passUsuario = form.password,
    this.newUsuario.repassUsuario = form.confirmPass
    this.registroService.addDatos(this.newUsuario).then(dato => {
      this.newUsuario = <Usuario>{};
      this.showToast('!Datos Agregados!');
    });
  }

  async showToast(msg: string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
