import {Component, Input} from '@angular/core';

@Component({
  selector: 'conv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() usdRate?: number
  @Input() eurRate?: number

}
