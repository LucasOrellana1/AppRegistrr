import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QRPage implements OnInit {

  //Ramos(documentos) existentes:

  horario = this.userService.getRamos();
  texto: string =  '';
  horario$: Observable<any> = new Observable<any>();
  dias: string[] = [];
  ramosPorDia: any = {};

  ramoSeleccionado: any;


  constructor(private userService: UsersService) { }
  
  ngOnInit() {
    this.horario$ = this.userService.horario$;

    this.horario$.pipe(
      map((horario) => {
        this.dias = this.getKeys(horario);
        this.dias.forEach((dia) => {
          this.ramosPorDia[dia] = this.getKeys(horario[dia]);
        });
      })
    ).subscribe();
  }

 // Método para obtener las claves de un objeto
 getKeys(obj: any): string[] {
  return obj ? Object.keys(obj) : [];
}

seleccionarRamo(ramo: any): void {
  this.ramoSeleccionado = ramo;
  console.log('Ramo seleccionado:', this.ramoSeleccionado);
  // Puedes hacer lo que desees con el objeto seleccionado aquí
  this.texto = JSON.stringify(this.ramoSeleccionado);
  console.log(this.texto);

}


 

  

  logout(){
    this.userService.logout();
  }

}
