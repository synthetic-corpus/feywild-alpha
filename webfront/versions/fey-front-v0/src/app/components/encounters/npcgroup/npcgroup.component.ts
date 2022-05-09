import { Component, Inject, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';
import { HttpReplyMessage } from 'src/app/interfaces/replies.interface';
import { ArrayService } from 'src/app/services/array.service';
import { EncounterHttpService } from 'src/app/services/http/encounter-http.service';
import { WebidsService } from 'src/app/services/webids.service';

@Component({
  selector: 'app-npcgroup',
  templateUrl: './npcgroup.component.html',
  styleUrls: ['./npcgroup.component.css']
})
export class NpcgroupComponent implements OnInit, OnDestroy {
  // Reactive Form that will have a list of NPCs to battle.
  db_id!: string // Will be the DB's unique identifier or "new"
  encounter_name: string = 'My Next Encounter'
  web_npcs!: {web_element_id: string, name: string, initiative: number, ac?: number, notes?: string}[]

  // Dummy data
  dummy_array = [
    {name: 'skeleton',initiative: 0, ac: 10},
    {name: 'skeleton',initiative: 0, ac: 10},
    {name: 'evil necromancer',initiative: 4, ac: 10, notes: "Is the Boss Fight"},
    {name: 'dungeon event',initiative: 6, notes: "not a monster, but counts lair events"}
  ]
  constructor(
    private route: ActivatedRoute,
    private encountersHttp: EncounterHttpService,
    private webId: WebidsService
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) =>{this.db_id = params['id']})

    // Dummy data
    this.web_npcs = this.readyNpcs(this.dummy_array)
        /*
    this.encountersHttp.retrieveEncounter(this.db_id)
        .subscribe(
          (reply: HttpReplyMessage) =>{
            console.log()
          }
        )*/
  }

  readyNpcs(npc_array: {web_element_id?:string,name: string, initiative: number, ac?: number, notes?: string}[]){
    const mutated = npc_array.map(
      (element) => {
        return element = {
          web_element_id: this.webId.generate(),
          ...element
        }
      }
    )
    return mutated
  }

  // The update, delete and Duplicate all update the array of NPCs,
  // Then Save to DB... (this is only a plan right now)
  getElementIndex(object){
    return this.web_npcs.findIndex((element)=>object.web_element_id === element.web_element_id)
  }

  onCreateNpc(newNpc){
    this.web_npcs.push(newNpc)
    this.autoSave()
  }

  onUpdateNpc(object){
    //console.log(object)
    const index = this.getElementIndex(object)
    this.web_npcs.splice(index,1,object)
    this.autoSave()
  }

  onDuplicateNpc(web_element_id){
    //console.log(e)
    const index = this.web_npcs.findIndex(element => element.web_element_id === web_element_id)
    const pushThis = this.web_npcs[index]
    pushThis.web_element_id = this.webId.generate()
    this.web_npcs.splice(index,0,pushThis)
    this.autoSave()
  }

  onDeleteNpc(web_element_id){
    //console.log(event)
    const index = this.web_npcs.findIndex(element => element.web_element_id === web_element_id)
    this.web_npcs.splice(index,1)
    this.autoSave()
  }

  autoSave(){
    const npcs = this.web_npcs.map((element)=> {delete element.web_element_id; return element})
    const saveThis = {
      message: `would Save/update to mongoID ${this.db_id}`,
      data: npcs
    }
    console.log(saveThis)
  }

  ngOnDestroy(): void {
      this.web_npcs.forEach(
        (element) => this.webId.remove(element.web_element_id)
      )
  }
}
