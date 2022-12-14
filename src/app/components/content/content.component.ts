import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CurrencyService, Rates} from '../../services/currency.service';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'conv-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit, OnDestroy {
  rates: Rates = {} as Rates
  currencies: string[] = []
  amount1 = 0
  amount2 = 0
  currency1 = 'UAH'
  currency2 = 'USD'
  subscriptions: Subscription = new Subscription()

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit() {
    this.getRates()
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  getRates() {
    this.subscriptions.add(
      this.currencyService.getData().subscribe((data) => {
        this.rates = data.rates
        this.currencies = Object.keys(data.rates)
      })
    )
  }

  rounded(value: number) {
    return +value.toFixed(2)
  }

  changeInput1ValueHandler($event: Event) {
    this.amount1 = +($event.currentTarget as HTMLInputElement).value
    this.amount2 = this.rounded(this.amount1 * this.rates[this.currency2 as keyof Rates] / this.rates[this.currency1 as keyof Rates])
  }

  changeSelect1ValueHandler($event: MatSelectChange) {
    this.currency1 = $event.value
    this.amount2 = this.rounded(this.amount1 * this.rates[this.currency2 as keyof Rates] / this.rates[this.currency1 as keyof Rates])
  }

  changeInput2ValueHandler($event: Event) {
    this.amount2 = +($event.currentTarget as HTMLInputElement).value
    this.amount1 = this.rounded(this.amount2 * this.rates[this.currency1 as keyof Rates] / this.rates[this.currency2 as keyof Rates])
  }

  changeSelect2ValueHandler($event: MatSelectChange) {
    this.currency2 = $event.value
    this.amount1 = this.rounded(this.amount2 * this.rates[this.currency1 as keyof Rates] / this.rates[this.currency2 as keyof Rates])
  }

}
