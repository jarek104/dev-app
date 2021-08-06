import * as axe from 'axe-core';

import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
import { DemoRegistryService } from './../demo-registry.service';
import { LazyLoaderService } from './../lazy-loader.service';
import { PageHostDirective } from './page-host.directive';
import { ThirdComponent } from './../components/third/third.component';

@Component({
  selector: 'app-page-host',
  templateUrl: './page-host.component.html',
  styleUrls: ['./page-host.component.scss']
})
export class PageHostComponent implements OnInit {

  @ViewChild(PageHostDirective, {static: true}) compHost!: PageHostDirective;
  onlyDemo = false;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
    private demoRegistry: DemoRegistryService,
    private lazyLoaderService: LazyLoaderService,
  ) { }

  ngOnInit() {

    this.route.params.pipe(
      map(params => params.compName),
    ).subscribe(path => {      
      this.loadComponent(path);
    })
  }

  loadComponent(path: any) {
    
    this.lazyLoaderService.loadModule(() => {
      return import(`../components/${path}/${path}.module`)
        .then(m => m.load())
    }
    ).then(_ => {

      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.demoRegistry.registry.value?.componentType);      
  
      const viewContainerRef = this.compHost.viewContainerRef;
      viewContainerRef.clear();
  
      const componentRef = viewContainerRef.createComponent<any>(componentFactory);
      
    });
  }

  loadModule() {
    
  }

  runTest() {
    axe
    .run()
    .then(results => {
      console.log(results)
      if (results.violations.length) {
        throw new Error(`${results.violations.length} accessibility issues found`);
      }
    })
    .catch(err => {
      console.error('Something bad happened:', err.message);
    });
  }
}