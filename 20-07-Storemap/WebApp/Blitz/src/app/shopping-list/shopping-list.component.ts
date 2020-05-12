import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { OktaAuthService } from '@okta/okta-angular';
import {Headers} from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  lists;
  constructor(private api: ApiCallService, private oktaAuth: OktaAuthService) { }

  async ngOnInit() {
    const accessToken = await this.oktaAuth.getAccessToken();
    const headers = new Headers({
      Authorization: 'Bearer ' + accessToken
    });
    //this.api.getData({url: 'http://localhost:4200/api/lists', headers });
    //this.api.data.subscribe((lists)=>lists.forEach(list => this.lists.push(list)));
    //this.lists=this.api.data;
  }

}
