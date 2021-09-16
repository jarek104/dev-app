import { AfterViewInit, Component, ComponentFactoryResolver, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { DemoRegistryService } from '../demo-registry.service';
import { HttpClient } from '@angular/common/http';
import { LazyLoaderService } from '../lazy-loader.service';
import { PageHostDirective } from '../page-host.directive';
import { RegisteredDemoChild } from '../types';

@Component({
  selector: 'app-demo-host',
  templateUrl: './demo-host.component.html',
  styleUrls: ['./demo-host.component.scss']
})
export class DemoHostComponent implements AfterViewInit {

  @ViewChild(PageHostDirective, {static: true}) compHost!: PageHostDirective;
  
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
    private demoRegistry: DemoRegistryService,
    private lazyLoaderService: LazyLoaderService,
    private http: HttpClient
  ) { }

  ngAfterViewInit(): void {
    this.route.params.subscribe(params => {
      this.lazyLoaderService.loadModule(() => {
        return import(`../components/${params.compName}/${params.compName}.module`)
          .then(m => m.default)
      }).then(_ => {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.demoRegistry.registry.value?.componentType);      

        const viewContainerRef = this.compHost.viewContainerRef;
        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent<any>(componentFactory);
        let theRightDemo: RegisteredDemoChild | undefined = undefined;
        
        if (params.demoName) { 
          theRightDemo = this.demoRegistry.registry.value?.children.filter(demo => demo.path === params.demoName)[0];
          
          Object.keys(theRightDemo?.data).forEach(key => {
            componentRef.instance[key] = theRightDemo!.data[key];
          });
        }
      })
    });
  }
}