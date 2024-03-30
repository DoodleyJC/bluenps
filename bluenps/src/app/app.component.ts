import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'bluenps';


  submitCourtName(): void{
    var e = (document.getElementById("courtSelection") as HTMLInputElement);
    var court = e.value;
    var name = (document.getElementById("nameInput") as HTMLInputElement).value;
    var date = new Date();
    alert(date.getTime());
  }
  



}






