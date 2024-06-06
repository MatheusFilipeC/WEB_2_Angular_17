import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSenhaGeradaComponent } from './modal-senha-gerada.component';

describe('ModalSenhaGeradaComponent', () => {
  let component: ModalSenhaGeradaComponent;
  let fixture: ComponentFixture<ModalSenhaGeradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSenhaGeradaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSenhaGeradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
