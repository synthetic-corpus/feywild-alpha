import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncounterHttp, EncounterPatch } from './interfaces/encounter.interfaces';
import  * as config from '../../../../auth_config.json';

@Injectable({
  providedIn: 'root'
})
export class EncounterHttpService {

  constructor(private http: HttpClient) { }

  createEncounter(newEncounter: EncounterHttp ){
    return this.http.post(`${config.apiUri}/encounter/`,newEncounter)
  }

  retrieveEncounter(id: string){
    return this.http.get(`${config.apiUri}/encounter/${id}`)
  }

  retrieveEncounters(){
    return this.http.get(`${config.apiUri}/encounter/`)
  }

  updateEncounter(id: string, patch: EncounterPatch){
    return this.http.patch(`${config.apiUri}/encounter/${id}`, patch)
  }

  deleteEncounter(id: string){
    return this.http.delete(`${config.apiUri}/encounter/${id}`)
  }
}
