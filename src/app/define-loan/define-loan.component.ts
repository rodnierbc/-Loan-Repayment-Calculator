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
  @Output() sendPaymentSchedule = new EventEmitter();// Create an Event Emitter with the objective of invoking the action createPaymentSchedule() defined on app-component
  constructor() { }

  ngOnInit() {
  }  
  //Method is responsible for creating a PaymentSchedule array and calls the method emit() on our @Output with the created array.
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
    while(amountToPay != 0){//Iterating while the amount to be paid is different from zero.
      if(amountToPay - installmentAmount < 0){
        installmentAmount = amountToPay;
      }
      let currentPay = installmentAmount + this.percentage(amountToPay, simpleInterestRate);
      let currentPayR = Number(currentPay.toFixed(2));//round the value to 2 decimal places.
      amountToPay = amountToPay - installmentAmount;
      lastPaymentDate = this.nextPaymentDate(lastPaymentDate, installmentInterval);
      let paymentSchedule = new PaymentSchedule(new Date(lastPaymentDate.getFullYear(), lastPaymentDate.getMonth(), lastPaymentDate.getDate()), currentPayR);
      paymentScheduleList.push(paymentSchedule);
    }
    this.sendPaymentSchedule.emit(paymentScheduleList);
  }
  //Method to determine given a year, whether this is a leap year or not.
  leap(year: number){
    return new Date(year, 1, 29).getMonth() === 1
  }
  //Method to determine the percentage of a number.
  percentage(num: number, per: number){
    return (num/100)*per;
  }
  //Method takes as inputs a date and Installment Interval (Daily, Weekly, Monthly) and returns the next date depending on the interval provided.
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
  //Method returns the number of days for a given month.
  getDaysInMonth(year, month) {
    return [31, (this.leap(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  }
  //Method returns given a base date, the date increased by the number of months given.
  addMonths(date, value) {
    let d = new Date(date),
    n = date.getDate();
    d.setDate(1);
    d.setMonth(d.getMonth() + value);
    d.setDate(Math.min(n, this.getDaysInMonth(d.getFullYear(), d.getMonth())));
    return d;
  }
}
