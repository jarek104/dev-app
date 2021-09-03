import * as axe from 'axe-core';

import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { DemoRegistryService } from '../demo-registry.service';
import { HttpClient } from '@angular/common/http';
import { LazyLoaderService } from '../lazy-loader.service';
import { map } from 'rxjs/operators';

const generatedRoutes = '../assets/routes.json';

@Component({
  selector: 'app-demo-list',
  templateUrl: './demo-list.component.html',
  styleUrls: ['./demo-list.component.scss']
})
export class DemoListComponent implements OnInit, AfterViewInit {

  demos?: any[];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
    private demoRegistry: DemoRegistryService,
    private lazyLoaderService: LazyLoaderService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.demoRegistry.registry.subscribe(data => {
      this.demos = data?.children.map(item => {
        return {
          path: `./demo/${item.path}`,
          label: item.label,
          hidden: item.hidden
        };
      });
    });
  }

  ngAfterViewInit(): void {
    this.route.params.subscribe(params => {
      if (!params.compName) {
        return;
      }
      this.lazyLoaderService.loadModule(() => {
        return import(`../components/${params.compName}/${params.compName}.module`)
          .then(m => m.default)
      });
    });
  }

  // runTest() {
  //   axe
  //   .run()
  //   .then(results => {
  //     console.log(results)
  //     if (results.violations.length) {
  //       throw new Error(`${results.violations.length} accessibility issues found`);
  //     }
  //   })
  //   .catch(err => {
  //     console.error('Something bad happened:', err.message);
  //   });
  // }
}