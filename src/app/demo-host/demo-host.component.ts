import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { DemoDataService } from './demo-data.service';
import { DemoRegistryService } from '../demo-registry.service';
import { HttpClient } from '@angular/common/http';
import { LazyLoaderService } from '../lazy-loader.service';
import { MatSidenav } from '@angular/material/sidenav';
import { PageHostDirective } from '../page-host.directive';
import { RegisteredDemoChild } from '../types';

// const generatedRoutes = '../assets/routes.json';

@Component({
  selector: 'app-demo-host',
  templateUrl: './demo-host.component.html',
  styleUrls: ['./demo-host.component.scss']
})
export class DemoHostComponent implements OnInit, AfterViewInit {

  @ViewChild(PageHostDirective, {static: true}) compHost!: PageHostDirective;
  // @ViewChild(MatSidenav) sidenav?: MatSidenav;
  // opened = false;
  // routes: any[] = [];
  
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
    private demoRegistry: DemoRegistryService,
    private lazyLoaderService: LazyLoaderService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    // this.http.get(generatedRoutes).subscribe(data => {
    //   this.routes = (data as any).routes.map((item: string) => {
    //     return {
    //       route: `/host/${item}`,
    //       label: item.toUpperCase()
    //     };
    //   });
    // })
  }
  ngAfterViewInit(): void {
    this.route.params.subscribe(params => {
      console.log('params', params);
      
      // if (!params.compName) {
      //   return;
      // }
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
    
    // this.route.params.subscribe(params => {

    //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.demoRegistry.registry.value?.componentType);      
  
    //   const viewContainerRef = this.compHost.viewContainerRef;
    //   viewContainerRef.clear();

    //   const componentRef = viewContainerRef.createComponent<any>(componentFactory);
    //   let theRightDemo: RegisteredDemoChild | undefined = undefined;
    //   if (params.demoName) {
    //     console.log(params.demoName, theRightDemo);
        
    //     theRightDemo = this.demoRegistry.registry.value?.children.filter(demo => demo.path === params.demoName)[0];
        
    //     Object.keys(theRightDemo?.data).forEach(key => {
    //       componentRef.instance[key] = theRightDemo!.data[key];
    //     });
    //   }
    // });
  }

  loadModule(host: string, demoName = '') {
    
    

  }


}