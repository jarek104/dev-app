import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DemoHostComponent } from './demo-host/demo-host.component';
import { FirstComponent } from './components/first/first.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core';
import { PageHostComponent } from './page-host/page-host.component';
import { PageHostDirective } from './page-host/page-host.directive';
import { Router } from '@angular/router';
import { SecondComponent } from './components/second/second.component';
import { ThirdComponent } from './components/third/third.component';

const generatedRoutes = '../assets/routes.json';

@NgModule({
  declarations: [
    AppComponent,
    PageHostComponent,
    PageHostDirective,
    FirstComponent,
    DemoHostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
