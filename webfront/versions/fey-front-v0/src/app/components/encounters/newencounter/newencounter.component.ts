import { Component, OnInit } from '@angular/core';
import { WebidsService } from 'src/app/services/webids.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SanitizeStringsService } from 'src/app/services/sanitize-strings.service';

@Component({
  selector: 'app-newencounter',
  templateUrl: './newencounter.component.html',
  styleUrls: ['./newencounter.component.css']
})
export class NewencounterComponent implements OnInit {
  page: number = 0

  web_npcs: {web_element_id: string, name: string, initiative: number, ac?: number, notes?: string}[]

  encounterForm: FormGroup
  constructor(
    private webId: WebidsService,
    private sanitizeString: SanitizeStringsService
  ) { }

  ngOnInit(): void {
    this.encounterForm =  new FormGroup({
      'encounterFC': new FormControl([
        Validators.required,
        Validators.minLength(3),
        this.sanitizeString.mustHaveLetters()
      ])
    })
  }

  getElementIndex(object){
    return this.web_npcs.findIndex((element)=>object.web_element_id === element.web_element_id)
  }

  onCreateNpc(newNpc){
    this.web_npcs.push(newNpc)
  }

  onUpdateNpc(object){
    //console.log(object)
    const index = this.getElementIndex(object)
    this.web_npcs.splice(index,1,object)
  }

  onDuplicateNpc(web_element_id){
    //console.log(e)
    const index = this.web_npcs.findIndex(element => element.web_element_id === web_element_id)
    const pushThis = this.web_npcs[index]
    pushThis.web_element_id = this.webId.generate()
    this.web_npcs.splice(index,0,pushThis)
  }

  onDeleteNpc(web_element_id){
    //console.log(event)
    const index = this.web_npcs.findIndex(element => element.web_element_id === web_element_id)
    this.web_npcs.splice(index,1)
  }

  onSave(){
    const npcs = this.web_npcs.map((element)=> {delete element.web_element_id; return element})
    const name = this.sanitizeString.sanitize(this.encounterForm.value.nameFC)
    const saveThis = {
      _campaign_id: 'This Campaign',
      name,
      npcs
    }
    console.log(
      {
        message: "Would Save this...",
        data: saveThis
      }
    )
    // Navigate away
  }
}
