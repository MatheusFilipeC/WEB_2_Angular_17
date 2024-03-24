import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRecolhimentoComponent } from './modal-recolhimento.component';

describe('ModalRecolhimentoComponent', () => {
  let component: ModalRecolhimentoComponent;
  let fixture: ComponentFixture<ModalRecolhimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRecolhimentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalRecolhimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
