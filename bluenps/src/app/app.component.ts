import { Component } from '@angular/core';
import {formatDate} from '@angular/common';
import { HttpClient, HttpResponse } from  '@angular/common/http';
import {signup, BackendService } from './backend.service';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'routing';
}
    






