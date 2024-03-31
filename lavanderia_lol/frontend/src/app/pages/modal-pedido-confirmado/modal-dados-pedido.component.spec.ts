import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDadosPedidoComponent } from './modal-dados-pedido.component';

describe('ModalDadosPedidoComponent', () => {
  let component: ModalDadosPedidoComponent;
  let fixture: ComponentFixture<ModalDadosPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDadosPedidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDadosPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
