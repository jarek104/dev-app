import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { DemoDataService } from './demo-data.service';
import { DemoRegistryService } from '../demo-registry.service';
import { LazyLoaderService } from '../lazy-loader.service';
import { PageHostDirective } from '../page-host/page-host.directive';
import { RegisteredDemoChild } from '../types';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-demo-host',
  templateUrl: './demo-host.component.html',
  styleUrls: ['./demo-host.component.scss']
})
export class DemoHostComponent implements OnInit, AfterViewInit {

  @ViewChild(PageHostDirective, {static: true}) compHost!: PageHostDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
    private demoRegistry: DemoRegistryService,
    private lazyLoaderService: LazyLoaderService,
  ) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.route.params.subscribe(params => {
      this.loadModule(params.compName, params.demoName);
      console.log('demoname', params)
    })
    
  }

  loadModule(host: string, demoName = '') {
    console.log('loadModule', host, this.compHost);
    
    this.lazyLoaderService.loadModule(() => {
      return import(`../components/${host}/${host}.module`)
        .then(m => m.default)
    }
    ).then(_ => {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.demoRegistry.registry.value?.componentType);      
  
      const viewContainerRef = this.compHost.viewContainerRef;
      viewContainerRef.clear();
  
      const componentRef = viewContainerRef.createComponent<any>(componentFactory);
      let theRightDemo: RegisteredDemoChild | undefined = undefined;
      if (demoName) {
        theRightDemo = this.demoRegistry.registry.value?.children.filter(demo => demo.path === demoName)[0];
        console.log('found demo', theRightDemo);
        
        Object.keys(theRightDemo?.data).forEach(key => {
          componentRef.instance[key] = theRightDemo!.data[key];
        });

      }
      // componentRef.instance.name = this.demoRegistry.registry.value?.children[0].data.name;;
      // componentRef.instance.color = this.demoRegistry.registry.value?.children[0].data.color;
    });

  }


}