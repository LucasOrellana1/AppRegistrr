import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  nombreEstudiante = localStorage.getItem('nombre');
  correoEstudiante = localStorage.getItem('correo');
  edadEstudiante = 20;
  carreraEstudiante = 'Ingeniería Informática';
  
  constructor() { }

  async logout(){
    localStorage.removeItem('ingresado');
    localStorage.removeItem('esProf');
    localStorage.removeItem('nombre');
    localStorage.removeItem('correo');
    window.location.reload();

  }
  


  ngOnInit() {
  }

}
