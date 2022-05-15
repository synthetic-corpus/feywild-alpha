import { Component, OnInit } from '@angular/core';
import { EncounterHttpService } from 'src/app/services/http/encounter-http.service';
import { HttpReplyMessage } from 'src/app/interfaces/replies.interface';


@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.css']
})
export class EncountersComponent implements OnInit {

  myEncounters: {_id: string, name:string, npcs: any[]}[] = []

  constructor(
    private encountersHttp: EncounterHttpService
  ) { }

  ngOnInit(): void {
    this.encountersHttp.retrieveEncounters()
      .subscribe(
        (reply: HttpReplyMessage) => {
          this.myEncounters = reply.data as {_id: string, name:string, npcs: any[]}[]
        },
        (error) =>{
          console.log(error)
        }
      )
  }

}
