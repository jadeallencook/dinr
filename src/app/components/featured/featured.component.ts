import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  @Input() type: string;

  constructor() {}

  ngOnInit() {
    console.log(this.type);
  }

}
