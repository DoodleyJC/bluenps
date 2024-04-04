import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import { HttpClient, HttpResponse } from  '@angular/common/http';
import {signup, BackendService } from '../backend.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  title = 'bluenps';
  test: any;
  data: signup[]= [{name: "uninitialized", court: "uninitialized", time: "please wait"}];
  constructor(private http: HttpClient, private backendService: BackendService){}
  
  ngOnInit(){
    this.refreshData();
  }

  refreshData(){
    console.log("refreshing data");
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
      next: (value) =>this.refreshData(),
      error:(e)=>{console.log("error",e); this.refreshData()}}
    )
    this.refreshData();
  }
  deletePlayer(player: signup): void{
    this.backendService.deleteData(player.name).subscribe(
      {
        next: (value) => {this.refreshData();},
        error: (e) => {console.log("errordeleting:", e);this.refreshData();}
      }
    )
  }
    
}
