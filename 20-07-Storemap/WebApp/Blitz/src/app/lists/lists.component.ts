import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  links  = ['test','est','est'];
  constructor() { }

  ngOnInit() {
  }
  addList(){}
  showList(test){
    console.log("test"+test);
  }
}
