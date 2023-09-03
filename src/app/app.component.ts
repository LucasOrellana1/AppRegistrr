import { Component } from '@angular/core';
interface Componente{
  icon:string;
  name:string;
  redirecTo:string;
  }
  
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  constructor() {}

  componentes : Componente[] = [
    {
    icon: 'american-football-outline',
    name: 'Register',
    redirecTo: '/register'
    },
    {
      icon: 'clipboard-outline',
      name: 'About',
      redirecTo: '/about'
    },
    {
      icon: 'Camera',
      name: 'Camara',
      redirecTo: '/camara'
    },
  ]
}
