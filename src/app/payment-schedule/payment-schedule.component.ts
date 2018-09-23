import { Component, OnInit, Input } from '@angular/core';
import { PaymentSchedule } from '../models/paymentSchedule.model';

@Component({
  selector: 'app-payment-schedule',
  templateUrl: './payment-schedule.component.html',
  styleUrls: ['./payment-schedule.component.css']
})
export class PaymentScheduleComponent implements OnInit {  
  @Input() paymentSheduleListToShow: PaymentSchedule[];//be ready to receive PaymentSchedule array from the app.component.
  constructor() { }
  ngOnInit() {
  }
}
