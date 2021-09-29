import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChartFileComponent } from './add-chart-file.component';

describe('AddChartFileComponent', () => {
  let component: AddChartFileComponent;
  let fixture: ComponentFixture<AddChartFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChartFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChartFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
