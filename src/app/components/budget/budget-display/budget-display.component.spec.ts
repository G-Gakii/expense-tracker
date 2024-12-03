import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetDisplayComponent } from './budget-display.component';

describe('BudgetDisplayComponent', () => {
  let component: BudgetDisplayComponent;
  let fixture: ComponentFixture<BudgetDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
