import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

export type signup = {
  name: string;
  time: string;
  court: string;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  
  url :string = "https://backendbluenps.azurewebsites.net/";
  constructor(private http: HttpClient) { }



  getAllData( ){
    console.log("test");
    return this.http.get<signup[]>(this.url);
  }

  postSignup(newPlayer:signup){
    console.log(newPlayer);
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.post(this.url, newPlayer, {headers: headers});
  }
}
