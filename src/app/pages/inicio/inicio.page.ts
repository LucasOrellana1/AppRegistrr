import { Component, OnInit } from '@angular/core';

interface Componente{
  icon:string;
  name:string;
  redirecTo:string;
  }
  

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

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


    ];
    
  constructor() { }

  ngOnInit() {
  }

}
