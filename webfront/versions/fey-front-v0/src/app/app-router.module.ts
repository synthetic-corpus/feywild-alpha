import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EncountersComponent } from './components/encounters/encounters.component';
import { TentGroupComponent } from './components/tents/tent-group/tent-group.component';
import { NpcgroupComponent } from './components/encounters/npcgroup/npcgroup.component';
import { NewencounterComponent } from './components/encounters/newencounter/newencounter.component';
import { InitiativeListComponent } from './components/run-encounters/initiative-list/initiative-list.component';

const appRoutes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'encounters', component: EncountersComponent},
  { path: 'encounters/:id', component: NpcgroupComponent},
  { path: 'encounters/:id/run', component: InitiativeListComponent},
  { path: 'tents', component: TentGroupComponent},
  { path: 'new', children: [
    {path: 'encounter', component: NewencounterComponent, pathMatch: 'full'}
  ]},
  { path: '**', redirectTo: '/home', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRouterModule { }
