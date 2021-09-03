import { CommonModule } from '@angular/common';
import { DemoRegistryService } from 'src/app/demo-registry.service';
import { FirstComponent } from './first.component';
import { FirstConfig } from './first.component.config';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export default class FirstModule {

  constructor(
    private demoRegistry: DemoRegistryService
  ) {        
    this.demoRegistry.registerDemo({
      demoLabel: 'First Component',
      componentType: FirstComponent,
      path: 'first',
      children: FirstConfig
    })
  }
}
