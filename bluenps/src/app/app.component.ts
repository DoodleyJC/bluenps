import { Component } from '@angular/core';
import {formatDate} from '@angular/common';
import { HttpClient, HttpResponse } from  '@angular/common/http';
import {signup, BackendService } from './backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'bluenps';
  test: any;
  data: signup[]= [];
  constructor(private http: HttpClient, private backendService: BackendService){}
  
  ngOnInit(){
    this.refreshData();
  }

  refreshData(){
    this.backendService.getAllData()
    .subscribe( data => this.data = data);
  }
  submitCourtName(): void{

    
    var e = (document.getElementById("courtSelection") as HTMLInputElement);
    var court = e.value;
    var name = (document.getElementById("nameInput") as HTMLInputElement).value;
    var date = new Date();
    if(name==undefined || date==undefined || court == undefined){
      alert("error");
      return;
    }
    var dateString = formatDate(date, "yyyy-MM-dd", 'en')
    
    var newSignup:signup = {
                "name" : name,
                "time" : dateString,
                "court" : court
    }
    this.backendService.postSignup(newSignup).subscribe({
      next(value) {alert("succesfully signed up, refresh page to see yourself")},
      error: (e) =>console.log(e)}
    )
  }

  



}






