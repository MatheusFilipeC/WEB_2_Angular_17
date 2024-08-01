import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutencaoRoupasFuncionarioComponent } from './manutencao-roupas-funcionario.component';

describe('ManutencaoRoupasFuncionarioComponent', () => {
  let component: ManutencaoRoupasFuncionarioComponent;
  let fixture: ComponentFixture<ManutencaoRoupasFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManutencaoRoupasFuncionarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManutencaoRoupasFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
