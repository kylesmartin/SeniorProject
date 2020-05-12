import { Component,ViewEncapsulation, OnInit,HostListener} from '@angular/core';

@Component({
  selector: 'store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StoreComponent implements OnInit {
  id;
  chain_id;
  location;
  map_id;
  name;
  @HostListener("click") onClick(){
    console.log("User Click using Host Listener",this.id,this.name)
  }
  constructor() { }

  ngOnInit() {
  }
  setData(element){
    this.id=element.id;
    this.chain_id=element.chain_id;
    this.location=element.location;
    this.map_id=element.map_id;
    this.name=element.name;
  }


}
