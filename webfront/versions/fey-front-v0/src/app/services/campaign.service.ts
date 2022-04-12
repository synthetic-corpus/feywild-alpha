import { Injectable } from '@angular/core';
import { CampaignHttpService } from './http/campaign-http.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  currentCampaign: {_id?: string, _user_id?: string, name?: string, _v?: number, notes?: string} = {}

  constructor(
    private campaignHttp: CampaignHttpService
  ) { }

  readyCampaign(){
    this.campaignHttp.retrieveCampaigns()
      .subscribe(
        (res: any)=>{
          this.currentCampaign = res.data[0]
          console.log(this.currentCampaign)
        }
      )
  }

}
