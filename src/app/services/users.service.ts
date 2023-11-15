import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Auth,createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword , signOut, updateEmail} from '@angular/fire/auth';

import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { sendEmailVerification, sendPasswordResetEmail, updateCurrentUser, updateProfile, verifyBeforeUpdateEmail } from 'firebase/auth';
import { switchMap, take } from 'rxjs';

interface DocumentoAsistencia {
  sala: string;
  seccion: string;
  ramo: string;
  asistentes?: string[];
}


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

getEstudianteActual(){
  this.afAuth.authState.subscribe((user:any) => {
    return user;
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

actualizarPass(json: any){
  const auth = getAuth();
  sendPasswordResetEmail(auth, json)
    .then(() => {
      console.log(json);
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);

    });

}

contenidoQr(){
  this.afAuth.authState.subscribe((user:any) => {
    const id = user.id;
    const documentRef = this.fire.collection('Ramos').doc(id);
    
    documentRef.valueChanges().pipe(
      take(1)
    ).subscribe(data => {
      // `data` contiene los contenidos del documento como un objeto JSON
      const jsonData = JSON.stringify(data);
      console.log(jsonData);
      return jsonData;
      // Puedes almacenar jsonData en una variable si es necesario
    });
  }); 
}


asistencia(datos:any, nombre:string){
  
  const asistenciaHoy: DocumentoAsistencia = {
    sala: datos.sala,
    seccion: datos.seccion,
    ramo: datos.ramo,
    asistentes: [nombre],
  };
  
  const fechaHoy: Date = new Date();
  const fechaFormateada: string = fechaHoy.toISOString().split('T')[0];  // Formato YYYY-MM-DD
  
  console.log(fechaFormateada)

  const documentoRef = this.fire.collection('Asistencia').doc(fechaFormateada);
 
    // Utiliza switchMap para manejar la lógica de actualización basada en si el documento existe o no
    
    return documentoRef.valueChanges().pipe(
      take(1),
      switchMap(documentData => {
        const typedDocumentData = documentData as { asistentes?: string[] };

        if (typedDocumentData && typedDocumentData.asistentes) {
          
          console.log('El documento ya existe. No se necesita crear.');

          console.log(documentData)

          const arrayExistente = typedDocumentData.asistentes || [];
          arrayExistente.push(nombre);  // Agrega el nuevo elemento al array
          return documentoRef.update({ asistentes: arrayExistente }).then(() => arrayExistente);


        } else {
          console.log('El documento no existe, créalo con el array inicial');
          //Crea el array:
          return documentoRef.set(asistenciaHoy).then(() => asistenciaHoy);
          
        
        }
      })
    ).subscribe(
      (asistenciaGuardada) => {
        console.log('Operación completada con éxito', asistenciaGuardada);
      },
      error => {
        console.error('Error en la operación:', error);
      }
    );

}}

