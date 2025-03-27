import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnamneseFormComponent } from './anamnese-form.component';

describe('AnamneseFormComponent', () => {
  let component: AnamneseFormComponent;
  let fixture: ComponentFixture<AnamneseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Se o componente for standalone, use:
      imports: [AnamneseFormComponent]

      // Se estiver usando NgModule, use:
      // declarations: [AnamneseFormComponent],
      // imports: [CommonModule, ReactiveFormsModule, etc...]
    }).compileComponents();

    fixture = TestBed.createComponent(AnamneseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
