import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AnamneseService } from './anamnese.service';

describe('AnamneseService', () => {
  let service: AnamneseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AnamneseService],
    });
    service = TestBed.inject(AnamneseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Exemplo de teste adicional para verificar se um método existe.
  // Ajuste conforme seus métodos reais (listarAnamneses, create, update, etc.).
  it('should have a create method', () => {
    expect(service.create).toBeDefined();
  });
});
