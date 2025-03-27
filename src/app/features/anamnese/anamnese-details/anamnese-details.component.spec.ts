import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnamneseDetailsComponent } from './anamnese-details.component';

describe('AnamneseDetailsComponent', () => {
  let component: AnamneseDetailsComponent;
  let fixture: ComponentFixture<AnamneseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Se estiver usando o standalone component, adicione-o em imports:
      imports: [AnamneseDetailsComponent],
      // caso contrário, use declarations: [AnamneseDetailsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AnamneseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
