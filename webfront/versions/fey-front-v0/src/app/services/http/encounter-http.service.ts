import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncounterHttp, EncounterPatch } from './interfaces/encounter.interfaces';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncounterHttpService {

  constructor(private http: HttpClient) { }

  createEncounter(newEncounter: EncounterHttp ){
    return this.http.post(`${env.auth.apiUri}/encounter/`,newEncounter)
  }

  retrieveEncounter(id: string){
    return this.http.get(`${env.auth.apiUri}/encounter/${id}`)
  }

  retrieveEncounters(){
    return this.http.get(`${env.auth.apiUri}/encounter/`)
  }

  updateEncounter(id: string, patch: EncounterPatch){
    return this.http.patch(`${env.auth.apiUri}/encounter/${id}`, patch)
  }

  deleteEncounter(id: string){
    return this.http.delete(`${env.auth.apiUri}/encounter/${id}`)
  }
}
