import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Loan } from '../models/loan.model';
import { PaymentSchedule} from '../models/paymentSchedule.model';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-define-loan',
  templateUrl: './define-loan.component.html',
  styleUrls: ['./define-loan.component.css']
})
export class DefineLoanComponent implements OnInit {
  startDate1: Date;
  constructor() { }

  ngOnInit() {
  }

  

  createPaymentSchedule(startDate1: string, loanAmount: string, installmentAmount: string, simpleInterestRate: string, installmentInterval: string) {
    alert(this.startDate1);
    
  }

}
