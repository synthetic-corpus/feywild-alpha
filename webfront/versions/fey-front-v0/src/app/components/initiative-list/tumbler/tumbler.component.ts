import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
/*
  Each of these represent one character in initiative order.
*/
@Component({
  selector: 'app-tumbler',
  templateUrl: './tumbler.component.html',
  styleUrls: ['./tumbler.component.css']
})
export class TumblerComponent implements OnInit {
  @Output() deleteTumbler = new EventEmitter<string>() // Just outputs its web_element_id
  @Output() rollAgain = new EventEmitter<string>() // Emits advantage, disadvantage, or normal

  @Input() web_element_id!: string
  @Input() name!: string
  @Input() roll!: number
  @Input() last_roll_method!: string

  active: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  onToggleActive(){
    this.active = true ? false : true
  }

  onDeleteTumbler(){
    this.deleteTumbler.emit(this.web_element_id)
  }
}
