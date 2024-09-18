import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatinetIcdChartComponent } from './patinet-icd-chart.component';

describe('PatinetIcdChartComponent', () => {
  let component: PatinetIcdChartComponent;
  let fixture: ComponentFixture<PatinetIcdChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatinetIcdChartComponent]
    });
    fixture = TestBed.createComponent(PatinetIcdChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
