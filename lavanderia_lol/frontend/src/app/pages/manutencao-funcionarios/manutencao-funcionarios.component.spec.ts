import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutencaoFuncionariosComponent } from './manutencao-funcionarios.component';

describe('ManutencaoFuncionariosComponent', () => {
  let component: ManutencaoFuncionariosComponent;
  let fixture: ComponentFixture<ManutencaoFuncionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManutencaoFuncionariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManutencaoFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
