import { ExtraOptions, Router, RouterModule, Routes } from '@angular/router';

import { DemoHostComponent } from './demo-host/demo-host.component';
import { E2eHostComponent } from './e2e-host/e2e-host.component';
import { NgModule } from '@angular/core';
import { PageHostComponent } from './page-host/page-host.component';

export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always'
};

const routes: Routes = [
  { path: 'host/:compName', children: [
    { path: 'demo/:demoName', component: DemoHostComponent },
    { path: 'e2e/:e2eName', component: E2eHostComponent },
  ]},
  // { path: 'host/:compName', component: PageHostComponent, children: [
  //   { path: 'demos/:demoName', component: DemoHostComponent },
  //   { path: 'e2e/:e2eName', component: E2eHostComponent },
  // ]},
  // { path: '**', component: PageHostComponent, resolve: { routes: MyResolver } },
];
// components/ContentListComponent/e2e/basic
// components/ContentListComponent/e2e/compact

// components/ContentListComponent/overview
// components/ContentListComponent/api
// components/ContentListComponent/demos/features
// components/ContentListComponent/demos/compact


@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfiguration)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
  
}
