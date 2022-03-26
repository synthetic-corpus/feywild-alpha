import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  * as config from '../../../../auth_config.json';


@Injectable({
  providedIn: 'root'
})
export class TentHttpService {

  constructor(private http: HttpClient) { }

  createTent(){
    this.http.post(`${config.apiUri}`,{});
  }
}
