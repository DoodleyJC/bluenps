import { Component } from '@angular/core';
import {formatDate} from '@angular/common';
import { HttpClient, HttpResponse } from  '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'bluenps';
  test: any;
  constructor(private http: HttpClient){}


  submitCourtName(): void{
    var e = (document.getElementById("courtSelection") as HTMLInputElement);
    var court = e.value;
    var name = (document.getElementById("nameInput") as HTMLInputElement).value;
    var date = new Date();
    var dateString = formatDate(date, "yyyy-MM-dd", 'en')
    var dict = {
                "name" : name,
                "time" : dateString,
                "court" : court
    }
    var response = this.http.get("http://localhost:8000");
    response.subscribe( {
      next: (r) => {this.test=r},
      error: (e) => console.log(e),
    }
    )
  }
  



}






