import { Component, OnInit } from '@angular/core';
import { RespuestaTopHeadlines } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticias.service';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  data: any []= [];

  constructor(private noticiasService: NoticiasService) { }
  

  ngOnInit(): void{
    this.llenarData();
    //const apiUrl = 'https://apimocha.com/feriados_api/posts'; // Reemplaza con la URL de la API que deseas consumir.
    //this.http.get(apiUrl).subscribe((data) => {
     // console.log('Datos de la API:', data);
      // Puedes procesar y trabajar con los datos aquí.
    //});
  }
  llenarData (){
    this.noticiasService.getData().subscribe(data =>{
      this.data = data;
      console.log (this.data);
    })
  }
}
