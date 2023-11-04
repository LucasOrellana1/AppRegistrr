import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  
  private apiUrl = 'https://apimocha.com/feriados_api/posts';
  
  constructor(private Http: HttpClient) { }
  
  public getData (): Observable<any>{
    return this.Http.get<any>(this. apiUrl)
  }
}
