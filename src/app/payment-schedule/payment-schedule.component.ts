import { Component, OnInit } from '@angular/core';
import { PaymentSchedule } from '../models/paymentSchedule.model';

@Component({
  selector: 'app-payment-schedule',
  templateUrl: './payment-schedule.component.html',
  styleUrls: ['./payment-schedule.component.css']
})
export class PaymentScheduleComponent implements OnInit {  
  paymentSheduleList: PaymentSchedule[];
  showPaymentSheduleList: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  createPaymentSchedule(paymentSheduleListSended : PaymentSchedule[]){
    this.paymentSheduleList = paymentSheduleListSended;
    this.showPaymentSheduleList = true;
    alert('siiiiiiiiii');

  }

}
