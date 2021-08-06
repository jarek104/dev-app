import { CommonModule } from '@angular/common';
import { DemoRegistryService } from 'src/app/demo-registry.service';
import { NgModule } from '@angular/core';
import { SecondComponent } from './second.component';
import { SecondConfig } from './second.component.config';

export function load() {
  return SecondModule;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SecondModule { 
  
  constructor(
    private demoRegistry: DemoRegistryService
  ) {
    console.log('registering second module');
    
    this.demoRegistry.registerDemo({
      demoLabel: 'Second Component',
      componentType: SecondComponent,
      path: 'second',
      children: SecondConfig
    })
  }
}
