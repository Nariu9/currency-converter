import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrencyService} from '../../services/currency.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'conv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  usdRate: number | undefined
  eurRate: number | undefined
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
        this.usdRate = +(1 / data.rates.USD).toFixed(2)
        this.eurRate = +(1 / data.rates.EUR).toFixed(2)
      })
    )
  }

}
