import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacaoPedidosFuncionarioComponent } from './visualizacao-pedidos-funcionario.component';

describe('VisualizacaoPedidosFuncionarioComponent', () => {
  let component: VisualizacaoPedidosFuncionarioComponent;
  let fixture: ComponentFixture<VisualizacaoPedidosFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizacaoPedidosFuncionarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizacaoPedidosFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
