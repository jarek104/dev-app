import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {

  name = 'default';
  color = 'lightcoral';

  ngOnInit() {
  }

}