import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteComponent } from './delete/delete.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: "secretdelete", component: DeleteComponent },
  {path: "", component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }