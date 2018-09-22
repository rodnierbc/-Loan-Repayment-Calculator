import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Loan } from '../models/loan.model';
import { PaymentSchedule} from '../models/paymentSchedule.model';
import { DateFormat} from '../models/dateFormat.model';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-define-loan',
  templateUrl: './define-loan.component.html',
  styleUrls: ['./define-loan.component.css']
})
export class DefineLoanComponent implements OnInit {
  date : DateFormat;
  @Output() sendPaymentSchedule = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  

  createPaymentSchedule(loanAmountP: string, installmentAmountP: string, simpleInterestRateP: string, installmentIntervalP: string) {
    let paymentScheduleList : PaymentSchedule[] = new Array();
    let amountToPay = Number(loanAmountP);
    let installmentAmount= Number(installmentAmountP);
    let simpleInterestRate = Number(simpleInterestRateP);
    let installmentInterval = Number(installmentIntervalP);
    let lastPaymentDate = new Date();
    lastPaymentDate.setFullYear(this.date.year);
    lastPaymentDate.setMonth(this.date.month -1);
    lastPaymentDate.setDate(this.date.day);
    
    while(amountToPay != 0){
      if(amountToPay - installmentAmount < 0){
        installmentAmount = amountToPay;
      }
      let currentPay = installmentAmount + this.percentage(amountToPay, simpleInterestRate);
      amountToPay = amountToPay - installmentAmount;
      lastPaymentDate = this.nextPaymentDate(lastPaymentDate, installmentInterval);
      let paymentSchedule = new PaymentSchedule(new Date(lastPaymentDate.getFullYear(), lastPaymentDate.getMonth(), lastPaymentDate.getDate()), currentPay);
      paymentScheduleList.push(paymentSchedule);
    }
    this.sendPaymentSchedule.emit(paymentScheduleList);
    
  }
  leap(year: number){
    return new Date(year, 1, 29).getMonth() === 1
  }
  percentage(num: number, per: number){
    return (num/100)*per;
  }
  nextPaymentDate(lastPaymentDate: Date, installmentInterval: number){
    let nextPaymentDateValue = lastPaymentDate;
    if(installmentInterval == 1){
      nextPaymentDateValue.setDate(nextPaymentDateValue.getDate() + 1);
    }
    else if(installmentInterval == 2){
      nextPaymentDateValue.setDate(nextPaymentDateValue.getDate() + 7);
    }
    else if(installmentInterval == 3){
      nextPaymentDateValue = this.addMonths(nextPaymentDateValue, 1);  
    }
    return nextPaymentDateValue;
  }
  getDaysInMonth(year, month) {
    return [31, (this.leap(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  }

  addMonths(date, value) {
    let d = new Date(date),
    n = date.getDate();
    d.setDate(1);
    alert(d.getMonth());
    d.setMonth(d.getMonth() + value);
    d.setDate(Math.min(n, this.getDaysInMonth(d.getFullYear(), d.getMonth())));
    return d;
  }
}
