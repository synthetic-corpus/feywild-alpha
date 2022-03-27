import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TentHttp, TentPatch } from './interfaces/tent.interfaces';
import  * as config from '../../../../auth_config.json';



@Injectable({
  providedIn: 'root'
})
export class TentHttpService {

  constructor(private http: HttpClient) { }

  createTent(newTent: TentHttp ){
    return this.http.post(`${config.apiUri}/tent/`,newTent)
  }

  retrieveTent(id: string){
    return this.http.get(`${config.apiUri}/tent/${id}`)
  }

  retrieveTents(){
    return this.http.get(`${config.apiUri}/tent/`)
  }

  updateTent(id: string, patch: TentPatch){
    return this.http.patch(`${config.apiUri}/tent/${id}`, patch)
  }

  deleteTent(id: string){
    return this.http.delete(`${config.apiUri}/tent/${id}`)
  }
}
