import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoPedidoClienteComponent } from './novo-pedido-cliente.component';

describe('NovoPedidoClienteComponent', () => {
  let component: NovoPedidoClienteComponent;
  let fixture: ComponentFixture<NovoPedidoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovoPedidoClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NovoPedidoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
