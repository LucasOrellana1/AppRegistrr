import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

//Modulos de Api
import {HttpClientModule} from '@angular/common/http';

//Routing entre vistas
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


//Librerias de storage(CRUD)
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
//import { Drivers}

// import firebase + enviornment
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    FormsModule,
    ReactiveFormsModule,
    
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule, 
  
    
    AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot({
    name: 'mydb',
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
  }),
   provideFirebaseApp(() => initializeApp({"projectId":"appregistrr","appId":"1:7350694014:web:047a6308f161e5cbb6282f","storageBucket":"appregistrr.appspot.com","apiKey":"AIzaSyB8sv35xR6YwcZ5e5zPeioaxMU3tp5dfb4","authDomain":"appregistrr.firebaseapp.com","messagingSenderId":"7350694014","measurementId":"G-VVBGHHJ5QV"})), provideAuth(() => getAuth())],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
