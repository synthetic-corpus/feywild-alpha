import { Injectable } from '@angular/core';
import { UserHttp, UserPatch } from './interfaces/user.interfaces';
import { HttpClient } from '@angular/common/http';
import  * as config from '../../../../auth_config.json';

@Injectable({
  providedIn: 'root'
})
export class AccountHttpService {

  constructor(private http: HttpClient) { }

  createUser(newUser: UserHttp ){
    return this.http.post(`${config.apiUri}/user`,newUser)
  }

  retrieveSelf(){
    return this.http.get(`${config.apiUri}/user/self`)
  }

  updateSelf(patch: UserPatch){
    return this.http.patch(`${config.apiUri}/tent/self`, patch)
  }

  deleteSelf(){
    return this.http.delete(`${config.apiUri}/user/self`)
  }
}
