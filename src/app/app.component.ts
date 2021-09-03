import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { DemoRegistryService } from './demo-registry.service';
import { HttpClient } from '@angular/common/http';
import { LazyLoaderService } from './lazy-loader.service';
import { MatSidenav } from '@angular/material/sidenav';

const generatedRoutes = '../assets/routes.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav?: MatSidenav;
  opened = false;
  routes: any[] = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get(generatedRoutes).subscribe(data => {
      this.routes = (data as any).routes.map((item: string) => {
        return {
          route: `/host/${item}`,
          label: item.toUpperCase()
        };
      });
    })
  }
}
