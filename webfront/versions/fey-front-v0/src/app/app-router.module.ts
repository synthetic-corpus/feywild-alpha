import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EncountersComponent } from './components/encounters/encounters.component';
import { TentsComponent } from './components/tents/tents.component';
import { NpcgroupComponent } from './components/encounters/npcgroup/npcgroup.component';

const appRoutes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'encounters', component: EncountersComponent},
  { path: 'encounters/:id', component: NpcgroupComponent},
  { path: 'tents', component: TentsComponent},
  { path: '**', redirectTo: '/home', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRouterModule { }
