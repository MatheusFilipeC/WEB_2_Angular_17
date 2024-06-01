import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPagamentoRealizadoComponent } from './modal-pagamento-realizado.component';

describe('ModalPagamentoRealizadoComponent', () => {
  let component: ModalPagamentoRealizadoComponent;
  let fixture: ComponentFixture<ModalPagamentoRealizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPagamentoRealizadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalPagamentoRealizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
