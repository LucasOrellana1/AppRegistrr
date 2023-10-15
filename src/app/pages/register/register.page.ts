
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { RegistroserviceService, Usuario } from 'src/app/services/login/registroservice.service';
import { matchpass } from './matchpass';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formularioRegistro: FormGroup;
  newUsuario: Usuario= <Usuario>{};
  errores: string[] = [];

  constructor(private registroService: RegistroserviceService,
              private alertController: AlertController,
              private toastController: ToastController,
              private fb:FormBuilder) {
                this.formularioRegistro = this.fb.group({
                  'nombre' : new FormControl("", 
                  [Validators.required, 
                    Validators.minLength(3), 
                    this.noEspaciosValidator, 
                    /* Validators.pattern('^[a-z0-9]+$') */
                    ] 
                  ),
                  'correo' : new FormControl("", [Validators.required,Validators.email, 
                    this.noEspaciosValidator, ]),

                  'password' : new FormControl("", [Validators.required,
                     Validators.minLength(6), this.noEspaciosValidator,
                     Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]),

                  'confirmPass' : new FormControl("", Validators.required),
                  'esProf' : new FormControl("", Validators.required),
                  
            },{
              validators: matchpass
            });
};
get correo(){
  return this.formularioRegistro.get('correo');
}
get nombre(){
  return this.formularioRegistro.get('nombre');
}
get password(){
  return this.formularioRegistro.get('password');
}
get confirmPass(){
  return this.formularioRegistro.get('password');
}


// Mensajes de error: 
validations = {
  'password': [
    { type: 'required', message: 'Password  is required.' },
    { type: 'minlength', message: 'Password  must be at least 5 characters long.' },
    { type: 'maxlength', message: 'Password  cannot be more than 25 characters long.' },
    { type: 'pattern', message: 'Your Password  must contain only numbers and letters.' },
    { type: 'Password NotAvailable', message: 'Your Password  is already taken.' }
  ],

};

  noEspaciosValidator(control: any) {
    if (control.value && /\s/.test(control.value)) {
      return { noEspacios: true }; // Retorna un error si encuentra espacios en blanco
    }
    return null; // Retorna nulo si no se encontraron espacios en blanco
    }
  
  //MSG de error

  
 
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
  ngOnInit() {
  }

}
