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
      icon: 'clipboard',
      name: 'Perfil',
      redirecTo: '/perfil'
    },
    {
      icon: 'clipboard-outline',
      name: 'About',
      redirecTo: '/about'
    },
    {
      icon: 'newspaper',
      name: 'Feriados Legales',
      redirecTo: '/noticias',
    },

  ]
}
