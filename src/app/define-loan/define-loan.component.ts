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
  constructor() { }

  ngOnInit() {
  }

  

  createPaymentSchedule(loanAmountP: string, installmentAmountP: string, simpleInterestRateP: string, installmentIntervalP: string) {
    let amountToPay = Number(loanAmountP);
    let installmentAmount= Number(installmentAmountP);
    let simpleInterestRate = Number(simpleInterestRateP);
    let installmentInterval = Number(installmentIntervalP);
    
    while(amountToPay != 0){
      if(amountToPay - installmentAmount < 0){
        installmentAmount = amountToPay;
      }
      let currentPay = installmentAmount + this.percentage(amountToPay, simpleInterestRate);
      amountToPay = amountToPay - installmentAmount;
      alert(currentPay);
    }
    
  }


  leap(year: number) {
    return new Date(year, 1, 29).getMonth() === 1
  }
  percentage(num: number, per: number)
{
  return (num/100)*per;
}

}
