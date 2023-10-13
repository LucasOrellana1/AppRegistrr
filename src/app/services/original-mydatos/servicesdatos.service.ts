import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';




export interface Datos {
  id: number;
  nombre: string;
  apellidop: string; 
  apellidom: string; 
  rut: string; 
  modified: number;

}

const ITEMS_KEY = 'my-datos'; 
@Injectable({
  providedIn: 'root'
}) 

export class ServicedatosService{
  //***
  private _storage: Storage | null = null ;
  newUser : Datos = <Datos>{};

  constructor(private storage: Storage){
    this.init();
  };

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  async addDatos(dato: Datos):Promise<any>{
    return this.storage.get(ITEMS_KEY).then((datos : Datos[])=>{
      if(datos){
        datos.push(dato);
        return this.storage.set(ITEMS_KEY,datos);

      }
      else{
        return this.storage.set(ITEMS_KEY,[dato]);
      }
    })
  }

//Lectura de datos y actualizacion

  getDatos(): Promise<Datos[]>{
    return this.storage.get(ITEMS_KEY);
  }

  async updateDatos(dato: Datos):Promise<any>{
    return this.storage.get(ITEMS_KEY).then((datos : Datos[])=>{
      if(!datos || datos.length == 0){
        return null;
      }
      let newDato: Datos[] = [];
      for(let i of datos){
        if(i.id === dato.id){
          newDato.push(dato);
        }
        else{
          newDato.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY,newDato); 

    })
  }
 
//Eliminar
async deleteDatos(id: number):Promise<Datos> {
  return this.storage.get(ITEMS_KEY).then((datos : Datos[])=>{
    if(!datos || datos.length == 0){
      return null;
    }
  let toKeep: Datos[] = [];
  for(let i of datos){
    if(i.id === id){
      toKeep.push(i);
    }
  }
  return this.storage.set(ITEMS_KEY, toKeep);
});
}
}