import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { WebidsService } from 'src/app/services/webids.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SanitizeStringsService } from 'src/app/services/sanitize-strings.service';

@Component({
  selector: 'app-npcadd',
  templateUrl: './npcadd.component.html',
  styleUrls: ['./npcadd.component.css']
})
export class NpcaddComponent implements OnInit, OnDestroy {
  @Output() newNpc = new EventEmitter<{web_element_id: string, name: string, initiative: number, armor?: number, notes?: string}>()
  @Input() maxed_out!: boolean

  adding: boolean = false;

  web_element_id: string = this.webId.generate()
  name: string
  initiative: number
  armor: number
  notes: string

  npcForm: FormGroup

  constructor(
    private webId: WebidsService,
    private sanitizeString: SanitizeStringsService
  ) { }

  ngOnInit(): void {
    this.npcForm = new FormGroup({
      'nameFC': new FormControl(this.name, [
        Validators.required,
        Validators.minLength(3),
        this.sanitizeString.mustHaveLetters()
      ]),
      'initiativeFC': new FormControl(this.initiative,[Validators.required]),
      'armorFC': new FormControl(this.armor),
      'notesFC': new FormControl(this.notes,[
        this.sanitizeString.mustHaveLetters()
      ])
    })
  }

  toggleAdding(){
    this.adding ? this.adding = false : this.adding = true
  }

  onAddNpc(){
    this.name = this.sanitizeString.sanitize(this.npcForm.value.nameFC)
    this.notes = this.sanitizeString.sanitize(this.npcForm.value.notesFC)

    this.newNpc.emit({
      web_element_id: this.web_element_id,
      name: this.name,
      initiative: this.initiative,
      armor: this.armor,
      notes: this.notes
    })
    this.toggleAdding()
    this.npcForm.reset()
  }

  ngOnDestroy(): void {
      this.webId.remove(this.web_element_id)
  }
}
