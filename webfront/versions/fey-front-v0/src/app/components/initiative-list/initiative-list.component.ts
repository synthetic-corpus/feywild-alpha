import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpReplyMessage } from 'src/app/interfaces/replies.interface';
import { EncounterHttpService } from 'src/app/services/http/encounter-http.service';
import { TentHttp } from 'src/app/services/http/interfaces/tent.interfaces';
import { TentHttpService } from 'src/app/services/http/tent-http.service'
import { WebidsService } from 'src/app/services/webids.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SanitizeStringsService } from 'src/app/services/sanitize-strings.service';
@Component({
  selector: 'app-initiative-list',
  templateUrl: './initiative-list.component.html',
  styleUrls: ['./initiative-list.component.css']
})
export class InitiativeListComponent implements OnInit, OnDestroy {
  db_id!: string
  init_list: {web_element_id: string, name: string, roll: number, active: boolean}[] = []
  addQuickie: FormGroup

  constructor(
    private route: ActivatedRoute,
    private encountersHttp: EncounterHttpService,
    private tentHttp: TentHttpService,
    private webId: WebidsService,
    private sanitizeString: SanitizeStringsService
  ) { }

  ngOnInit(): void {
    this.addQuickie = new FormGroup({
      'nameFC': new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        this.sanitizeString.mustHaveLetters()
      ]),
      'initiativeFC': new FormControl(0,[Validators.required])
    })

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
                this.addAndSort(npc.initiative,npc.name)
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
                this.addAndSort(element.initiative,element.character)
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

  addAndSort(init_mod,name){
    // takes in a name and init_modifiers.
    // Appends to init list and sorts it.
    const roll: number = this.rollInit(init_mod)
    const nextChar = {
      name,
      roll,
      web_element_id: this.webId.generate(),
      active: true
    }
    this.init_list.push(nextChar)
    this.init_list.sort((a,b) => {return b.roll - a.roll})
  }

  onToggleActive(web_element_id: string){
    const location = this.init_list.findIndex((element)=>{return element.web_element_id === web_element_id})
    this.init_list[location].active ? this.init_list[location].active = false : this.init_list[location].active = true
  }

  onDeleteElement(web_element_id:string){
    const location = this.init_list.findIndex((element)=>{return element.web_element_id === web_element_id})
    this.init_list.splice(location,1)
  }

  onSubmitQuickie(){
    const name = this.sanitizeString.sanitize(this.addQuickie.value.nameFC)
    const init_mod = this.addQuickie.value.initiativeFC
    this.addAndSort(name,init_mod)
    this.addQuickie.reset()
  }

  ngOnDestroy(): void {
    this.init_list.forEach(
      (element) => {
        this.webId.remove(element.web_element_id)
      }
    )
  }
}
