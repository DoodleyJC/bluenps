import { Component } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  constructor(private backendService: BackendService){}

    deleteData(){
      var name = (document.getElementById("regexInput") as HTMLInputElement).value;
      if(name.length<1){
        alert("error");
        return;
      } 
      this.backendService.deleteData(name).subscribe({
        next: (value) => {alert("successfully deleted")},
        error: (e)=>{console.log(e); alert("error");}
      });
    }
}
