import { Component, Inject, OnInit } from '@angular/core';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { CampaignHttpService } from 'src/app/services/http/campaign-http.service';
import { AccountHttpService } from 'src/app/services/http/account-http.service';
import { HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isCollapsed = true;
  faUser = faUser;
  faPowerOff = faPowerOff;
  userName: string = '';


  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
    private campaignService: CampaignHttpService,
    private userService: AccountHttpService
  ) {}

  ngOnInit() {
    this.auth.user$.subscribe(
      (profile) => {
        this.userName = profile?.given_name + " " + profile?.family_name || "New User"

      }
    );
  }

  loginWithRedirect() {
    this.auth.loginWithRedirect();
    this.auth.user$.subscribe(
      (profile: any) => this.userName = profile?.given_name + " " + profile?.family_name || "New User"
    )
  }

  logout() {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }
}
