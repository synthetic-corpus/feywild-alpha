import { Component, OnInit } from '@angular/core';
import { TentWeb } from 'src/app/interfaces/tent.interface';
import { TentHttpService } from 'src/app/services/http/tent-http.service';
import { TentHttp } from 'src/app/services/http/interfaces/tent.interfaces';
import { WebidsService } from 'src/app/services/webids.service';
import { HttpReplyMessage } from 'src/app/interfaces/replies.interface';

@Component({
  selector: 'app-tent-group',
  templateUrl: './tent-group.component.html',
  styleUrls: ['./tent-group.component.css']
})
export class TentGroupComponent implements OnInit {

  web_players: TentWeb[]

  constructor(
    private tentHttpService: TentHttpService,
    private webId: WebidsService
  ) { }

  ngOnInit(): void {
    this.tentHttpService.retrieveTents()
      .subscribe(
        (reply: HttpReplyMessage) => {
          const players_http = reply.data.tents as TentHttp[]
          this.web_players = this.readyPlayers(players_http)
        }
      )
  }

  readyPlayers(player_array): TentWeb[] {
    const mutated: TentWeb[] = player_array.map(
      (element) => {
        return element = {
          web_element_id: this.webId.generate(),
          ...element
        }
      }
    )
    return mutated
  }

  getElementIndex(object){
    return this.web_players.findIndex((element)=>object.web_element_id === element.web_element_id)
  }

  onUpdatePlayer(object){
    const index = this.getElementIndex(object)
    this.web_players.splice(index,1,object)
    // save tent
  }

  onDeletePlayer(web_element_id){
    const index = this.web_players.findIndex(element => element.web_element_id === web_element_id)
    this.web_players.splice(index,1)
    // Delete the player
  }
}
