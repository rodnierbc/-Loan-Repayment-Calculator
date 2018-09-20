import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineLoanComponent } from './define-loan.component';

describe('DefineLoanComponent', () => {
  let component: DefineLoanComponent;
  let fixture: ComponentFixture<DefineLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefineLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefineLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
