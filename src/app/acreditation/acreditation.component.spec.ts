import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AcreditationComponent} from './acreditation.component';

describe('AcreditationComponent', () => {
  let component: AcreditationComponent;
  let fixture: ComponentFixture<AcreditationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcreditationComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcreditationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
