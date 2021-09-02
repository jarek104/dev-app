import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { DemoDataService } from './demo-data.service';
import { DemoRegistryService } from '../demo-registry.service';
import { HttpClient } from '@angular/common/http';
import { LazyLoaderService } from '../lazy-loader.service';
import { MatSidenav } from '@angular/material/sidenav';
import { PageHostDirective } from '../page-host/page-host.directive';
import { RegisteredDemoChild } from '../types';

const generatedRoutes = '../assets/routes.json';

@Component({
  selector: 'app-demo-host',
  templateUrl: './demo-host.component.html',
  styleUrls: ['./demo-host.component.scss']
})
export class DemoHostComponent implements OnInit, AfterViewInit {

  @ViewChild(PageHostDirective, {static: true}) compHost!: PageHostDirective;
  @ViewChild(MatSidenav) sidenav?: MatSidenav;
  opened = false;
  routes: any[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
    private demoRegistry: DemoRegistryService,
    private lazyLoaderService: LazyLoaderService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get(generatedRoutes).subscribe(data => {
      this.routes = (data as any).routes.map((item: string) => {
        return {
          route: `/host/${item}`,
          label: item.toUpperCase()
        } as any;
      });
      console.log(this.routes)
    })
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