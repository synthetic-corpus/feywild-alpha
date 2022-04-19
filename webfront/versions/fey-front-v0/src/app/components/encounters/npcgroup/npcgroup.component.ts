import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpReplyMessage } from 'src/app/interfaces/replies.interface';
import { EncounterHttpService } from 'src/app/services/http/encounter-http.service';

@Component({
  selector: 'app-npcgroup',
  templateUrl: './npcgroup.component.html',
  styleUrls: ['./npcgroup.component.css']
})
export class NpcgroupComponent implements OnInit {
  // Reactive Form that will have a list of NPCs to battle.
  db_id!: string // Will be the DB's unique identifier or "new"
  encounter_name: string = 'My Next Encounter'
  npcs: {name: string, initiative: number, ac?: number, notes?: number}[] = []

  constructor(
    private route: ActivatedRoute,
    private encountersHttp: EncounterHttpService
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) =>{this.db_id = params['id']})
    this.encountersHttp.retrieveEncounter(this.db_id)
        .subscribe(
          (reply: HttpReplyMessage) =>{
            console.log()
          }
        )
  }
}
