import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {provideRouter, RouterModule, Routes} from '@angular/router';
import { DeleteComponent } from './delete/delete.component';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AppRoutingModule } from './app-routing.module';
const routes: Routes = [
  {path:"test", component: DeleteComponent},
  {path: "", component: DeleteComponent},
  {path: "**", component: DeleteComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    DeleteComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
