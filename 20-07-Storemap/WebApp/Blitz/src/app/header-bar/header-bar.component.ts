import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {

  @Input()
  title: string; 

  constructor() { }

  ngOnInit() {
    console.log(this.title);
  }

}
