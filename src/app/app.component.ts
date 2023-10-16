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
      icon: 'clipboard',
      name: 'Login',
      redirecTo: ''
    },
    {
      icon: 'camera',
      name: 'Camara',
      redirecTo: '/camara',
    },
    {
      icon: 'newspaper',
      name: 'Noticias Duoc',
      redirecTo: '/noticias',
    },

  ]
}
