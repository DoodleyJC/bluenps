import { Component, OnInit } from '@angular/core';
import {formatDate, NgFor} from '@angular/common';
import { HttpClient, HttpResponse } from  '@angular/common/http';
import {signup, BackendService, signupPost } from '../backend.service';

@Component({
  selector: 'app-signups',
  templateUrl: './signups.component.html',
  styleUrl: './signups.component.css',
  standalone: true,
  imports:[NgFor]
})

export class SignupsComponent {
  data: signup[]= [{index: 0, name: "uninitialized", court: "uninitialized", time: "please wait"}];
  npsdata: signup[]= [{index: 0,name: "nps", court: "uninitialized", time: "please wait"}];
  bluedata: signup[] = [{index: 0,name: "blue", court: "uninitialized", time: "please wait"}];
  
  constructor(private http: HttpClient, private backendService: BackendService){}
  
  ngOnInit(){
    this.refreshData();
  }

  refreshData(){
    console.log("refreshing data");
    this.backendService.getAllData()
    .subscribe( data => this.setData(data));
  }


  setData(data:signup[]){
    this.data = data;
    this.npsdata = data.filter((activity) => activity.court === "nps");
    this.bluedata = data.filter((activity) => activity.court === "blue");
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
    
    var newSignup:signupPost = {
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
