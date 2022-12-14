import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'conv-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent {

  @Input() currencies?: string[]
  @Input() amount1?: number
  @Input() amount2?: number
  @Input() currency1?: string
  @Input() currency2?: string

  @Output() sendAmount1Event = new EventEmitter<number>()
  @Output() sendCurrency1Event = new EventEmitter<string>()
  @Output() sendAmount2Event = new EventEmitter<number>()
  @Output() sendCurrency2Event = new EventEmitter<string>()

  sendAmount1Handler($event: Event) {
    this.sendAmount1Event.emit(+($event.currentTarget as HTMLInputElement).value)
  }

  sendCurrency1Handler($event: MatSelectChange) {
    this.sendCurrency1Event.emit($event.value)
  }

  sendAmount2Handler($event: Event) {
    this.sendAmount2Event.emit(+($event.currentTarget as HTMLInputElement).value)
  }

  sendCurrency2Handler($event: MatSelectChange) {
    this.sendCurrency2Event.emit($event.value)
  }

}
