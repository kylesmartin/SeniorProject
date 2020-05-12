// messagelist.component.ts

import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { OktaAuthService } from '@okta/okta-angular';
import 'rxjs/Rx';

interface Message {
   date: string;
   text: string;
}

@Component({
  selector: 'app-message-list',
  templateUrl: './messagelist.component.html',
  styleUrls: ['./messagelist.component.css']
})
export class MessageListComponent implements OnInit{
  messages: Message [];

  constructor(private oktaAuth: OktaAuthService, private http: Http) {

    const m1: Message = {date: Date.now().toString(), text: 'test'};
    this.messages=[(m1)];
  }

  async ngOnInit() {
    const accessToken = await this.oktaAuth.getAccessToken();
    const headers = new Headers({
      Authorization: 'Bearer ' + accessToken
    });
    // Make request
    this.http.get(
      'http://localhost:4200/api/stores',
      new RequestOptions({headers:headers})
    )
    .map(res => res.json())
    .subscribe((messages: Array<Message>) => messages.forEach(message => this.messages.push(message)));
  }
}
