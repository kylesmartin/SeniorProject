import { Component, ComponentRef,OnInit,ViewContainerRef,ViewChild,ComponentFactory,ComponentFactoryResolver } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { OktaAuthService } from '@okta/okta-angular';
import {Headers} from '@angular/http';
import { StoreComponent } from '../store/store.component';
import 'rxjs/Rx';
@Component({
  selector: 'store-list-view',
  templateUrl: './store-list-view.component.html',
  styleUrls: ['./store-list-view.component.css']
})
export class StoreListViewComponent implements OnInit {
  stores=[];
  data;
  @ViewChild("itemContainer",{static: true,read:ViewContainerRef}) container;
  constructor(private resolver: ComponentFactoryResolver,private api: ApiCallService, private oktaAuth: OktaAuthService) { }

  loadDOM(json){
    this.container.clear();
    json.forEach(element => {
      console.log(element);
      const factory = this.resolver.resolveComponentFactory(StoreComponent);
      const componentRef = this.container.createComponent(factory);
      componentRef.instance.setData(element);
    });
  }

  async ngOnInit() {
    const accessToken = await this.oktaAuth.getAccessToken();
    const headers = new Headers({
      Authorization: 'Bearer ' + accessToken      
    });
    console.log("init",accessToken,headers);
    this.api.getData('http://localhost:4200/api/stores', headers).subscribe(data => {
      this.data = data;
      this.loadDOM(this.data);
    });
    
  }
}
