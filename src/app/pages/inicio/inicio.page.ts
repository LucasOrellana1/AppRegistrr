import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  nombreEstudiante = 'Juan';
  apellidoEstudiante = 'Pérez';
  edadEstudiante = 20;
  carreraEstudiante = 'Ingeniería Informática';
  
  constructor() { }

  async logout(){
    localStorage.removeItem('ingresado');
    window.location.reload();

  }


  ngOnInit() {
  }

}
