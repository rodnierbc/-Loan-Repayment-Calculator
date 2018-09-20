export class Loan{
    constructor (public startDate: Date, public  loanAmount: number, public installmentAmount: number, public simpleInterestRate: number, public installmentInterval: string ) {      }
  }