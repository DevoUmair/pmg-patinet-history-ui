import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatinetLabResultsComponent } from './patinet-lab-results.component';

describe('PatinetLabResultsComponent', () => {
  let component: PatinetLabResultsComponent;
  let fixture: ComponentFixture<PatinetLabResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatinetLabResultsComponent]
    });
    fixture = TestBed.createComponent(PatinetLabResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
