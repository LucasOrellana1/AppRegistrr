import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorGuardGuard implements CanActivate {
  
  constructor(private afAuth: AngularFireAuth, private router: Router){}

  canActivate(){
    return this.afAuth.authState.pipe(
      take(1),
      map((user) => {
        if (user && user.email && user.email.includes('@profesorduocuc')) {
          // El usuario está autenticado y su correo contiene "@profesorduocuc"
          return true;
        } else {
          // El usuario no está autenticado o no tiene el correo adecuado, redirigir al inicio de sesión
          this.router.navigate(['/profesor']);
          return false;
        }
      })
    );
}
}