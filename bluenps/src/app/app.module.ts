import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {provideRouter, RouterModule, Routes} from '@angular/router';
import { DeleteComponent } from './delete/delete.component';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SignupsComponent } from './signups/signups.component';


@NgModule({
  declarations: [
    AppComponent,
    //DeleteComponent,
    //HomePageComponent,
    //SignupsComponent,
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    RouterModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
