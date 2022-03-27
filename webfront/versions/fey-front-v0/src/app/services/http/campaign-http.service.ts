import { Injectable } from '@angular/core';
import { CampaignHttp, CampaignPatch } from './interfaces/campaign.interfaces';
import { HttpClient } from '@angular/common/http';
import  * as config from '../../../../auth_config.json';

@Injectable({
  providedIn: 'root'
})
export class CampaignHttpService {

  constructor(private http: HttpClient) { }

  createCampaign(newCampaign: CampaignHttp ){
    return this.http.post(`${config.apiUri}/campaign`,newCampaign)
  }

  retrieveCampaign(id: string){
    return this.http.get(`${config.apiUri}/campaign/${id}`)
  }

  retrieveCampaigns(){
    return this.http.get(`${config.apiUri}/campaign/`)
  }

  updateCampaign(id: string, patch: CampaignPatch){
    return this.http.patch(`${config.apiUri}/campaign/${id}`, patch)
  }

  deleteCampaign(id: string){
    return this.http.delete(`${config.apiUri}/campaign${id}`)
  }
}
