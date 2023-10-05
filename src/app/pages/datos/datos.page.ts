import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, Platform, ToastController } from '@ionic/angular';
import { Datos, ServicedatosService } from 'src/app/services/servicesdatos.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {

  datos: Datos[] = [];
  newDato: Datos = <Datos>{};
  @ViewChild('myList')  mylist!: IonList  ;

  constructor(private storageService: ServicedatosService, 
    
    private plt: Platform, private ToastController: ToastController
    ) {
      this.plt.ready().then(()=> {
        this.loadDatos();
      });
    }


    //get
    loadDatos(){
      this.storageService.getDatos().then(datos =>{
        this.datos = datos;
      });
    }

    //create

    addDatos(){
      this.newDato.modified = Date.now();
      this.newDato.id = Date.now();
      this.storageService.addDatos(this.newDato).then(dato => {
        this.newDato = <Datos>{};
        this.showToast('!Datos agregados');
        this.loadDatos();
      })

    }

    //update
    updateDatos(dato: Datos){
      dato.nombre = 'UPDATE: ${dato.nombre}';
      dato.modified = Date.now();
      this.storageService.updateDatos(dato).then( item =>{
        this.showToast("Elemento acutlizado");
        this.mylist.closeSlidingItems();
        this.loadDatos();
      })

    }

    //delete

    deleteDatos(dato: Datos){
      this.storageService.deleteDatos(dato.id).then(item => {
        this.showToast('Elemento eliminado');
        this.mylist.closeSlidingItems();
        this.loadDatos();
      })
    }


    //*** aqui use string par a el tipo del parametro ojo piojo *** */
    async showToast(msg: string){
      const toast = await this.ToastController.create({
        message: msg,
        duration: 2000
      });
      toast.present();
    }

  ngOnInit() {
  }

}
