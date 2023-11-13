import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Auth,createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword , signOut, updateEmail} from '@angular/fire/auth';

import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { sendEmailVerification, updateCurrentUser, updateProfile, verifyBeforeUpdateEmail } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})

export class UsersService {


  constructor(private fire: AngularFirestore,
              private auth: Auth,
              private router: Router,
              private afAuth: AngularFireAuth) { }


  getCollection(){
    //Subscribe mantiene la conexion a la coleccion:
    this.fire.collection('Estudiante').valueChanges().subscribe( (res) => 
    { 
      console.log(res);
    });
  }


  registerUser(json: any){
    
    // CREA PROFILE 
    createUserWithEmailAndPassword(this.auth, json.correo, json.password)
        .then(userCredential => {
          const user  = userCredential.user;
          console.log('Usuario creado: ' , user.uid);

          updateEmail(user , json.email).then(() => {
            console.log("Hecho 1")

          }).catch((error) => {
            
          });
          
          updateProfile(user , {
            displayName: json.nombre, 
            photoURL: "abc"
          }).then(() => {
            console.log("Hecho 2")
          }).catch((error) => {
         
          });
        
          // CREA FIRESTORE
          this.fire.collection('Estudiante').doc(user.uid).set({
            correo: json.correo,
            nombre: json.nombre,
          }) 
          .then(() => {
            console.log('Usuario registrado con éxito y datos adicionales almacenados.');
            this.router.navigate(['/']);
          })
          .catch(error => {
            console.error('Error al almacenar datos adicionales:', error);
          });

        })
        .catch(error => {
          console.error('Error al registrar usuario:', error);
        });
  }

  login(json:any){
    return signInWithEmailAndPassword(this.auth, json.correo, json.password)
    .then(() => {
      console.log('Logeado con exito');
      this.router.navigate(['/inicio']);

    })
    .catch(error => {
      console.error('Error al logear: ', error);
    });
  }

  logout(){
    signOut(this.auth);
    this.router.navigate(['']);
  }


verificarNuevoCorreo() {
  this.afAuth.authState.subscribe((user:any) => {
  if (user) {
    // Enviar el correo de verificación al nuevo correo electrónico
    user
      .sendEmailVerification()
      .then(() => {
        console.log('Correo de verificación enviado al nuevo correo electrónico.');
      })
      .catch((error: any) => {
        console.error('Error al enviar el correo de verificación:', error);
      });
    }
  })
}



 actualizarEstudiante(json: any){
 //Obtiene los datos actuales 
  this.afAuth.authState.subscribe((user:any) => {
  // ACtualiza FIRESTORE
    console.log(user);
    
    this.fire.collection('Estudiante').doc(user.uid).set({
    correo: json.correo,
    nombre: json.nombre,
    }) 
      .then(() => {
        console.log('Usuario registrado con éxito y datos adicionales almacenados.');
        
       
            verifyBeforeUpdateEmail(user, json.correo).then(() => {
                console.log("wena")
              }).catch((error) => {
                console.log(error)
                console.log("wena'nt")
              });
      })


      updateProfile(user , {
        displayName: json.nombre, 
        photoURL: "abc"
      }).then(() => {
        console.log("Hecho 2")
      }).catch((error) => {
      });
    })
      this.router.navigate(['/']); 
    }
}
