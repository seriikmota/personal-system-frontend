import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensageiroStatusComponent } from './mensageiro-status.component';

describe('MensageiroStatusComponent', () => {
  let component: MensageiroStatusComponent;
  let fixture: ComponentFixture<MensageiroStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensageiroStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensageiroStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
