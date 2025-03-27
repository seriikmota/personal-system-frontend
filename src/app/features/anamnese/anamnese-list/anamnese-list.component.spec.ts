import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnamneseListComponent } from './anamnese-list.component';

describe('AnamneseListComponent', () => {
  let component: AnamneseListComponent;
  let fixture: ComponentFixture<AnamneseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Se seu componente for standalone, use:
      imports: [AnamneseListComponent]

      // Se estiver usando módulos, use:
      // declarations: [AnamneseListComponent],
      // imports: [...]
    }).compileComponents();

    fixture = TestBed.createComponent(AnamneseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
