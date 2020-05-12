import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { OktaAuthService } from '@okta/okta-angular';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  data;
  json;
  query;
  constructor(private http: Http,private oktaAuth: OktaAuthService) { }
  
  call(url:string,headers:Headers){
    this.query= url;
    return this.http.get(url,new RequestOptions({headers:headers}));
  }

  getData(url:string,headers:Headers){
    return this.call(url,headers).map(res => {
      return res.json();
    });
  }
  
}




