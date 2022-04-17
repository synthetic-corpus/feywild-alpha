import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-npcgroup',
  templateUrl: './npcgroup.component.html',
  styleUrls: ['./npcgroup.component.css']
})
export class NpcgroupComponent implements OnInit {
  // Reactive Form that will have a list of NPCs to battle.
  db_id!: string // Will be the DB's unique identifier or "new"
  encounter_name: string = 'My Next Encounter'
  npcs: {name: string, initiative: number, ac?: number, notes?: number}[] = []

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) =>{this.db_id = params['id']})
  }
}
