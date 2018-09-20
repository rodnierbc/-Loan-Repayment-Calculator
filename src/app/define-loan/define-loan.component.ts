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
    let lastPaymentDate = this.date;
    
    while(amountToPay != 0){
      if(amountToPay - installmentAmount < 0){
        installmentAmount = amountToPay;
      }
      let currentPay = installmentAmount + this.percentage(amountToPay, simpleInterestRate);
      amountToPay = amountToPay - installmentAmount;
      lastPaymentDate = this.nextPaymentDate(lastPaymentDate, installmentInterval);
      alert(lastPaymentDate.month+"-"+lastPaymentDate.day+"-"+lastPaymentDate.year+"---------->"+currentPay);

    }
    
  }


leap(year: number){
  return new Date(year, 1, 29).getMonth() === 1
}
percentage(num: number, per: number){
  return (num/100)*per;
}

nextPaymentDate(lastPaymentDate: DateFormat, installmentInterval: number){
   let nextPaymentDate = lastPaymentDate;
     switch(lastPaymentDate.month){
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10: {//casos para los meses que tienen 31 dias
        if(installmentInterval == 1){//caso diario
         if(lastPaymentDate.day == 31){//si es el ultimo dia del mes(31)
           nextPaymentDate.month += 1;
           nextPaymentDate.day = 1;
         }
         else nextPaymentDate.day += 1;
        }
        else if(installmentInterval == 2){//caso semanal
          if(lastPaymentDate.day >= 24){// chequear si tenemos que cambiar al mes siguiente
            nextPaymentDate.month += 1;
            nextPaymentDate.day = lastPaymentDate.day -24;
          }
          else nextPaymentDate.day += 7;
        }
        else if(installmentInterval == 3){//caso mensual
          nextPaymentDate.month += 1;         
        }
        break;
       }
       case 4:
       case 6:
       case 9:
       case 11:{
         if(installmentInterval == 1){
          if(lastPaymentDate.day == 30){
            nextPaymentDate.month += 1;
            nextPaymentDate.day = 1;
          }
          else nextPaymentDate.day += 1;
         }
         else if(installmentInterval == 2){
          if(lastPaymentDate.day >= 23){
            nextPaymentDate.month += 1;
            nextPaymentDate.day = lastPaymentDate.day -23;
          }
          else nextPaymentDate.day += 7;
         }
         else if(installmentInterval == 3){//caso mensual
          nextPaymentDate.month += 1;         
        }        
        break;
       }
       case 12:{
         if(installmentInterval == 1){
          if(lastPaymentDate.day == 31){
            nextPaymentDate.month = 1;
            nextPaymentDate.day = 1;
            nextPaymentDate.year += 1;
          }
          else nextPaymentDate.day += 1;
         }
         else if(installmentInterval == 2){//caso semanal
          if(lastPaymentDate.day >= 24){// chequear si tenemos que cambiar al mes siguiente
            nextPaymentDate.year += 1
            nextPaymentDate.month = 1;
            nextPaymentDate.day = lastPaymentDate.day -24;
          }
          else nextPaymentDate.day += 7;
        }
        else if(installmentInterval == 3){//caso mensual
          nextPaymentDate.month = 1;
          nextPaymentDate.year += 1;      
        }         
        break;
       }
       case 2:{
         if(this.leap(lastPaymentDate.year)){
           if(installmentInterval == 1){
            if(lastPaymentDate.day == 29){
              nextPaymentDate.month += 1;
              nextPaymentDate.day = 1;
            }
            else nextPaymentDate.day += 1;
           }
           else if(installmentInterval == 2){
            if(lastPaymentDate.day >= 22){// chequear si tenemos que cambiar al mes siguiente
              nextPaymentDate.month += 1;
              nextPaymentDate.day = lastPaymentDate.day -22;
            }
            else nextPaymentDate.day += 7;
           }
           else if(installmentInterval == 3){
            nextPaymentDate.month += 1; 
           }           
           break;
         }
         else {
          if(installmentInterval == 1){
            if(lastPaymentDate.day == 28){
              nextPaymentDate.month += 1;
              nextPaymentDate.day = 1;
            }
            else nextPaymentDate.day += 1;
           }
           else if(installmentInterval == 2){
            if(lastPaymentDate.day >= 21){// chequear si tenemos que cambiar al mes siguiente
              nextPaymentDate.month += 1;
              nextPaymentDate.day = lastPaymentDate.day -21;
            }
            else nextPaymentDate.day += 7;
           }
           else if(installmentInterval == 3){
            nextPaymentDate.month += 1; 
           }           
           break;
         }      
       }
     }    
   return nextPaymentDate;
  }

}
