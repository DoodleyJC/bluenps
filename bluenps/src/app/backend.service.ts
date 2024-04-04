import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

export type signup = {
  index: number;
  name: string;
  time: string;
  court: string;
}

export type signupPost = {
  name: string;
  time: string;
  court: string;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  url :string = environment.backendUrl;
  constructor(private http: HttpClient) { }



  getAllData( ){
    console.log("test");
    return this.http.get<signup[]>(this.url);

    
  }

  postSignup(newPlayer:signupPost){
    console.log(newPlayer);
    var headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.post<signupPost>(this.url, newPlayer, {headers: headers});
  }


  deleteData(regexString:string){
    console.log(regexString);
    var headers = new HttpHeaders();
    headers = headers.set("nameQuery", regexString);
    console.log(headers);
    return this.http.delete(this.url + "delete", {headers: headers});

  }
}
