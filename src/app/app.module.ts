import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { DemoHostComponent } from './demo-host/demo-host.component';
import { DemoMaterialModule } from './material.module';
import { FirstComponent } from './components/first/first.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageHostComponent } from './page-host/page-host.component';
import { PageHostDirective } from './page-host/page-host.directive';

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
    DemoMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
