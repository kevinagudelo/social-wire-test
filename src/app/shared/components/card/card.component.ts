import { Component, Input, Output } from '@angular/core'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input () message!: any;
  constructor(

  ) {
    console.log(this.message);
  }

}
