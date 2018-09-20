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

  

  createPaymentSchedule(loanAmount: string, installmentAmount: string, simpleInterestRate: string, installmentInterval: string) {
    alert(this.leap(this.date.year));
    
  }
  leap(year: number) {
    return new Date(year, 1, 29).getMonth() === 1
  }

}
