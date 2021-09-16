import { Component, ComponentFactoryResolver, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { DemoRegistryService } from './demo-registry.service';
import { HttpClient } from '@angular/common/http';
import { LazyLoaderService } from './lazy-loader.service';
import { MatSidenav } from '@angular/material/sidenav';
import { SplitAreaDirective } from 'angular-split';

const generatedRoutes = '../assets/routes.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav) leftSidenav?: MatSidenav;
  @ViewChildren(SplitAreaDirective) areasEl?: QueryList<SplitAreaDirective>
  leftSidenavOpened = true;
  rightSidenavOpened = true;
  bottomDrawerOpened = true;
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

  toggleLeftDrawer() {
    if (this.leftSidenavOpened == false) {
      this.areasEl!.first.expand();
      this.leftSidenavOpened = true;
    } else {
      this.areasEl!.first.collapse();
      this.leftSidenavOpened = false;
    }
  }
  toggleRightDrawer() {
    if (this.rightSidenavOpened == false) {
      this.areasEl!.last.expand();
      this.rightSidenavOpened = true;
    } else {
      this.areasEl!.last.collapse();
      this.rightSidenavOpened = false;
    }
  }
  toggleBottomDrawer() {
    this.bottomDrawerOpened = !this.bottomDrawerOpened;
  }
}
