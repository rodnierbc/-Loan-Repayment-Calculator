import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DefineLoanComponent } from './define-loan/define-loan.component';
import { FormsModule } from '@angular/forms';
import { PaymentScheduleComponent } from './payment-schedule/payment-schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    DefineLoanComponent,
    PaymentScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
