import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Auth,createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword , signOut} from '@angular/fire/auth';

import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';

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

/*       nombre = res;
 */    });
  }


  updateUserProfile(displayName: string, photoURL: string) {
    this.afAuth.currentUser
      .then((user) => {
        return user?.updateProfile({ displayName, photoURL });
      })
      .then(() => {
        console.log('Perfil actualizado con éxito.');
      })
      .catch((error) => {
        console.error('Error al actualizar el perfil:', error);
      });
  }

  registerUser(json: any){
    console.log(json);
     createUserWithEmailAndPassword(this.auth, json.correo, json.password)
        .then(userCredential => {
          const user  = userCredential.user;

          this.updateUserProfile(json.nombre, 'qawd');
        
            
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
    console.log('cccc');
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

  getEstudiante(): any{
    
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user);
    
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      return user;

    } else {
      // No user is signed in.
      return null;
    }
}}