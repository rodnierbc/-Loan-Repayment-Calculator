import { Component } from '@angular/core';
import { PaymentSchedule } from './models/paymentSchedule.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'loanRepaymentCalculator';
  paymentSheduleList: PaymentSchedule[];

  createPaymentSchedule(paymentSheduleListSended : PaymentSchedule[]){
    this.paymentSheduleList = paymentSheduleListSended;
  }
}
