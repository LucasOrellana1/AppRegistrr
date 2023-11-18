
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { ReactiveFormsModule } from '@angular/forms';


import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { matchpass } from '../register/matchpass';
import { UsersService } from 'src/app/services/users.service';



@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage {

  formularioUpdate: FormGroup;

  
  constructor(private userService: UsersService,
              private alertController: AlertController,
              private toastController: ToastController,
              
              private fb:FormBuilder) {
                this.formularioUpdate = this.fb.group({
                  'nombre' : new FormControl("", 
                  [Validators.required, 
                    Validators.minLength(3), 
                    Validators.pattern('^[a-zA-Z\\s]*$')
                  ] 
                  ),
                  'correo' : new FormControl("", 
                  [Validators.required,
                    Validators.email,
                    /* correoExistenteValidator(this.registroService), */
                  ],
                  ),
                  'password' : new FormControl("", [Validators.required,
                     Validators.minLength(6),
                     Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]),
                  'confirmPass' : new FormControl("", Validators.required),
                  
            },{
              validators: matchpass
            });


}

get correo(){
  return this.formularioUpdate.get('correo');
}
get nombre(){
  return this.formularioUpdate.get('nombre');
}
get password(){
  return this.formularioUpdate.get('password');
}
get confirmPass(){
  return this.formularioUpdate.get('password');
}

onSubmit(){
  this.userService.actualizarEstudiante(this.formularioUpdate.value);
};

verificarcorreo(){
  this.userService.verificarNuevoCorreo();
  this.userService.presentAlert("Cambios realizados", "Cambios exitosos");

}

};