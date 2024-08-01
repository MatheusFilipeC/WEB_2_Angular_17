import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPedidoClienteComponent } from './consulta-pedido-cliente.component';

describe('ConsultaPedidoClienteComponent', () => {
  let component: ConsultaPedidoClienteComponent;
  let fixture: ComponentFixture<ConsultaPedidoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaPedidoClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaPedidoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
