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
      icon: 'clipboard-outline',
      name: 'About',
      redirecTo: '/about'
    },
    {
      icon: 'clipboard',
      name: 'Generar Qr',
      redirecTo: '/gen-qr'
    },
    {
      icon: 'newspaper',
      name: 'Feriados Legales',
      redirecTo: '/noticias',
    },

  ]
}
