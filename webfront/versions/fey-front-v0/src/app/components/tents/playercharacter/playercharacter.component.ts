import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-playercharacter',
  templateUrl: './playercharacter.component.html',
  styleUrls: ['./playercharacter.component.css']
})
export class PlayercharacterComponent implements OnInit {
  @Input() player_id!: string
  constructor() { }

  ngOnInit(): void {
  }

}
