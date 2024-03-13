import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemPedidosClienteComponent } from './listagem-pedidos-cliente.component';

describe('ListagemPedidosClienteComponent', () => {
  let component: ListagemPedidosClienteComponent;
  let fixture: ComponentFixture<ListagemPedidosClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemPedidosClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListagemPedidosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
