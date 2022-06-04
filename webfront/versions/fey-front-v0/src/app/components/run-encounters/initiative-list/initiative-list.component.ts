import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpReplyMessage } from 'src/app/interfaces/replies.interface';
import { EncounterHttpService } from 'src/app/services/http/encounter-http.service';
import { TentHttp } from 'src/app/services/http/interfaces/tent.interfaces';
import { TentHttpService } from 'src/app/services/http/tent-http.service'
import { WebidsService } from 'src/app/services/webids.service';

@Component({
  selector: 'app-initiative-list',
  templateUrl: './initiative-list.component.html',
  styleUrls: ['./initiative-list.component.css']
})
export class InitiativeListComponent implements OnInit {
  db_id!: string
  init_list: {web_element_id: string, name: string, roll: number}[] = []

  constructor(
    private route: ActivatedRoute,
    private encountersHttp: EncounterHttpService,
    private tentHttp: TentHttpService,
    private webId: WebidsService
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {this.db_id = params['id']}
      )

      this.encountersHttp.retrieveEncounter(this.db_id)
        .subscribe(
          (reply: HttpReplyMessage)=>{
            // get the monsters. Roll their init. Add to Array.
            reply.data.npcs.forEach(
              (npc: {name: string, initiative: number, ac?: number, notes?: number}) => {
                const roll: number = this.rollInit(npc.initiative)
                const nextNpc = {
                  name: npc.name,
                  roll,
                  web_element_id: this.webId.generate()
                }
                this.init_list.push(nextNpc)
                this.init_list.sort((a,b) => {return b.roll - a.roll})
              }
            )
          }
        )

      this.tentHttp.retrieveTents()
        .subscribe(
          (reply: HttpReplyMessage)=>{
            // Get the players. Roll their init. Add To array.
            reply.data.forEach(
              (element: TentHttp) => {
                const roll = this.rollInit(element.initiative)
                const nextPlayer = {
                  name: element.character,
                  roll,
                  web_element_id: this.webId.generate()
                }
                this.init_list.push(nextPlayer)
                this.init_list.sort((a,b) => {return b.roll - a.roll})
              }
            )
          }
        )

        this.init_list.sort((a,b) => {return b.roll - a.roll})
        console.log(this.init_list)
  }

  rollInit(modifer: number){
    /*
      Per basic 5e rules (and what I'm making up)
      1. d20 + Modifer is base
      2. Ties a broken by who had the higher mod
      3. If tied mod, ties borken by another d20 roll
    */

    const base_roll: number = this.roll20() + modifer
    const tie_breakers: number = (modifer * .01) + ((this.roll20() + modifer) * .0001)
    return base_roll + tie_breakers
  }

  roll20(){
    return Math.floor(Math.random() * (21 - 1)) + 1
  }


}
