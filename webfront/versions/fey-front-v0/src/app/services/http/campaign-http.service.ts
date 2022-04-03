import { Injectable } from '@angular/core';
import { CampaignHttp, CampaignPatch } from './interfaces/campaign.interfaces';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignHttpService {

  constructor(private http: HttpClient) { }

  createCampaign(newCampaign: CampaignHttp ){
    return this.http.post(`${env.auth.apiUri}/campaign`,newCampaign)
  }

  retrieveCampaign(id: string){
    return this.http.get(`${env.auth.apiUri}/campaign/${id}`)
  }

  retrieveCampaigns(){
    return this.http.get(`${env.auth.apiUri}/campaign/`)
  }

  updateCampaign(id: string, patch: CampaignPatch){
    return this.http.patch(`${env.auth.apiUri}/campaign/${id}`, patch)
  }

  deleteCampaign(id: string){
    return this.http.delete(`${env.auth.apiUri}/campaign${id}`)
  }
}
