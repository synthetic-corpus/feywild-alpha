import { Component, OnInit } from '@angular/core';
import { faPiggyBank} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  piggy = faPiggyBank
  constructor() { }

  ngOnInit(): void {
  }

}
