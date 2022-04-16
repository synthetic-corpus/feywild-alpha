import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-npcgroup',
  templateUrl: './npcgroup.component.html',
  styleUrls: ['./npcgroup.component.css']
})
export class NpcgroupComponent implements OnInit {
  // Reactive Form that will have a list of NPCs to battle.
  @Input() db_id: string
  constructor() { }

  ngOnInit(): void {
  }

}
