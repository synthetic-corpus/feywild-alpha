import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRouterModule } from './app-router.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { HomeComponent } from './components/home/home.component';
import { TentsComponent } from './components/tents/tents.component';
import { EncountersComponent } from './components/encounters/encounters.component';
import { RunEncountersComponent } from './components/run-encounters/run-encounters.component';
import { InitiativeListComponent } from './components/run-encounters/initiative-list/initiative-list.component';
import { NpcgroupComponent } from './components/encounters/npcgroup/npcgroup.component';
import { PlayercharacterComponent } from './components/tents/playercharacter/playercharacter.component';
import { NpcComponent } from './components/encounters/npc/npc.component';
import { NpcaddComponent } from './components/encounters/npcadd/npcadd.component';
import { NewencounterComponent } from './components/encounters/newencounter/newencounter.component';
import { TentGroupComponent } from './components/tents/tent-group/tent-group.component';
import { NewttentComponent } from './components/tents/newtent/newtent.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    StartPageComponent,
    HomeComponent,
    TentsComponent,
    EncountersComponent,
    RunEncountersComponent,
    InitiativeListComponent,
    NpcgroupComponent,
    PlayercharacterComponent,
    NpcComponent,
    NpcaddComponent,
    NewencounterComponent,
    TentGroupComponent,
    NewttentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    AppRouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        ...env.httpInterceptor,
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
