/*
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersComponent } from './orders.component';
import { OrderService } from './order.service';
import { of } from 'rxjs';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let orderServiceSpy: jasmine.SpyObj<OrderService>;

  beforeEach(async () => {
    // Criar um spy para o OrderService
    orderServiceSpy = jasmine.createSpyObj('OrderService', ['getOrders']);

    await TestBed.configureTestingModule({
      declarations: [ OrdersComponent ],
      providers: [
        { provide: OrderService, useValue: orderServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load orders on init', () => {
    const orders = [{ id: 1, date: new Date(), ... }, { id: 2, date: new Date(), ... }];
    orderServiceSpy.getOrders.and.returnValue(of(orders));

    fixture.detectChanges();

    expect(component.orders).toEqual(orders);
    expect(component.filteredOrders).toEqual(orders);
  });

  // Aqui você pode adicionar mais testes para outras funcionalidades do componente, como o filtro de pedidos.
});
*/