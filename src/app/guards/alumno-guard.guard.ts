import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AlumnoGuardGuard implements CanActivate {
  
  constructor(private afAuth: AngularFireAuth, private router: Router){}

  canActivate() {
    return this.afAuth.authState.pipe(
      take(1),
      map((user) => {
        if (user && user.email && user.email.toLowerCase().includes('@profesorduocuc')) {
          // El usuario está autenticado y su correo contiene '@profesorduocuc', denegar acceso
          this.router.navigate(['/qr']); // Redirigir a una página de denegación si es necesario
          return false;
        } else {
          // El usuario no está autenticado o no tiene el correo adecuado, permitir acceso
          return true;
        }
      })
    );
  }
}