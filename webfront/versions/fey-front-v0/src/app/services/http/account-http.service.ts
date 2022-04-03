import { Injectable } from '@angular/core';
import { UserHttp, UserPatch } from './interfaces/user.interfaces';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountHttpService {

  constructor(private http: HttpClient) { }

  createUser(newUser: UserHttp ){
    return this.http.post(`${env.auth.apiUri}/user`,newUser)
  }

  retrieveSelf(){
    return this.http.get(`${env.auth.apiUri}/user/self`)
  }

  updateSelf(patch: UserPatch){
    return this.http.patch(`${env.auth.apiUri}/tent/self`, patch)
  }

  deleteSelf(){
    return this.http.delete(`${env.auth.apiUri}/user/self`)
  }
}
