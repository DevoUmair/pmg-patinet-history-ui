import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatinetChartComponent } from './patinet-chart.component';

describe('PatinetChartComponent', () => {
  let component: PatinetChartComponent;
  let fixture: ComponentFixture<PatinetChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatinetChartComponent]
    });
    fixture = TestBed.createComponent(PatinetChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
