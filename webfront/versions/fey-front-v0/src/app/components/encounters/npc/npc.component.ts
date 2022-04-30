import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SanitizeStringsService } from 'src/app/services/sanitize-strings.service';
@Component({
  selector: 'app-npc',
  templateUrl: './npc.component.html',
  styleUrls: ['./npc.component.css']
})
export class NpcComponent implements OnInit {
  @Input() web_element_id!: string
  @Input() name!: string
  @Input() initiative!: number
  @Input() armor!: number
  @Input() notes!: string

  npcForm: FormGroup

  editting: boolean = false
  constructor(
    private sanitizeString: SanitizeStringsService
  ) { }

  ngOnInit(): void {
    this.npcForm = new FormGroup({
      'nameFC': new FormControl(this.name),
      'initiativeFC': new FormControl(this.initiative),
      'armorFC': new FormControl(this.armor),
      'notesFC': new FormControl(this.notes)
    })
  }

  toggleEdit(){
    this.editting ? this.editting = false : this.editting = true
  }

  onSubmit(){
    console.log(this.npcForm)
    this.toggleEdit()
    this.name = this.sanitizeString.sanitize(this.npcForm.value.nameFC)
    this.notes = this.sanitizeString.sanitize(this.npcForm.value.notesFC)
  }

}
