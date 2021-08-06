import { Component, OnInit } from '@angular/core';

import { DemoRegistryService } from 'src/app/demo-registry.service';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.css']
})
export class ThirdComponent implements OnInit {

  constructor(
    private demoRegistry: DemoRegistryService
  ) {
    this.demoRegistry.registerDemo({
      demoLabel: 'Third Component',
      componentType: ThirdComponent,
      path: 'third',
      children: []
    })
  }

  ngOnInit() {
  }

}