import { Component, Input, OnInit } from '@angular/core';

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

  editting: boolean = false
  constructor() { }

  ngOnInit(): void {
  }

  toggleEdit(){
    this.editting ? this.editting = false : this.editting = true
  }
}
