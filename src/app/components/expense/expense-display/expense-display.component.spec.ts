import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseDisplayComponent } from './expense-display.component';

describe('ExpenseDisplayComponent', () => {
  let component: ExpenseDisplayComponent;
  let fixture: ComponentFixture<ExpenseDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
