import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { ToolDetailsComponent } from './tools/tool-details/tool-details.component';

const toolChildrenRoutes: Routes = [
  { path: 'details/:id', component: ToolDetailsComponent },
  // { path: 'home', component: HomeComponent },
];

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tool', component: HomeComponent, children: toolChildrenRoutes },
  { path: 'home', component: HomeComponent,  },
  { path: '**', component: LandingComponent, pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
