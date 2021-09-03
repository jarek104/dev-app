import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DemoHostComponent } from './demo-host/demo-host.component';
import { DemoListComponent } from './demo-list/demo-list.component';
import { DemoMaterialModule } from './material.module';
import { FirstComponent } from './components/first/first.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PageHostDirective } from './page-host.directive';

@NgModule({
  declarations: [
    AppComponent,
    DemoListComponent,
    FirstComponent,
    DemoHostComponent,
    PageHostDirective,
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
