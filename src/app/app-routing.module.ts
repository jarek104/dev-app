import { ExtraOptions, Router, RouterModule, Routes, UrlMatchResult, UrlMatcher, UrlSegment } from '@angular/router';

import { DemoHostComponent } from './demo-host/demo-host.component';
import { DemoListComponent } from './demo-list/demo-list.component';
import { E2eHostComponent } from './e2e-host/e2e-host.component';
import { NgModule } from '@angular/core';

export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always'
};

const routes: Routes = [
  { path: 'host', children: [
    { path: ':compName', component: DemoListComponent },
    { path: ':compName/e2e/:e2eName', component: E2eHostComponent },
    { path: ':compName/demo/:demoName', component: DemoHostComponent },
    { path: ':compName/demo/:demoName/isolated', component: DemoHostComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
  
}
