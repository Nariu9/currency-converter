import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrencyService, Rates} from '../../services/currency.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'conv-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit, OnDestroy {

  rates: Rates = {} as Rates
  currencies: string[] = []
  amount1 = 0
  amount2 = 0
  currency1 = 'UAH'
  currency2 = 'USD'
  usdRate?: number
  eurRate?: number
  subscriptions: Subscription = new Subscription()

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit(): void {
    this.getRates()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getRates() {
    debugger
    this.subscriptions.add(
      this.currencyService.getData().subscribe((data) => {
        this.rates = data.rates
        this.currencies = Object.keys(data.rates)
        this.usdRate = this.roundNumber(1 / data.rates.USD)
        this.eurRate = this.roundNumber(1 / data.rates.EUR)
      })
    )
  }

  roundNumber(value: number) {
    return +value.toFixed(3)
  }

  changeAmount1Handler(value: number) {
    this.amount1 = value
    this.amount2 = this.roundNumber(this.amount1 * this.rates[this.currency2 as keyof Rates] / this.rates[this.currency1 as keyof Rates])
  }

  changeCurrency1Handler(value: string) {
    this.currency1 = value
    this.amount2 = this.roundNumber(this.amount1 * this.rates[this.currency2 as keyof Rates] / this.rates[this.currency1 as keyof Rates])
  }

  changeAmount2Handler(value: number) {
    this.amount2 = value
    this.amount1 = this.roundNumber(this.amount2 * this.rates[this.currency1 as keyof Rates] / this.rates[this.currency2 as keyof Rates])
  }

  changeCurrency2Handler(value: string) {
    this.currency2 = value
    this.amount1 = this.roundNumber(this.amount2 * this.rates[this.currency1 as keyof Rates] / this.rates[this.currency2 as keyof Rates])
  }

}
