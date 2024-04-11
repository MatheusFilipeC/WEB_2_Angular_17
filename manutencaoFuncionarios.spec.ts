/*
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeService } from '../employee.service';
import { of } from 'rxjs';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let employeeServiceSpy: jasmine.SpyObj<EmployeeService>;

  beforeEach(async () => {
    employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getEmployees']);

    await TestBed.configureTestingModule({
      declarations: [ EmployeeListComponent ],
      providers: [
        { provide: EmployeeService, useValue: employeeServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getEmployees on ngOnInit', () => {
    const employees = [
      { email: 'test1@example.com', nome: 'Teste 1', dataNascimento: new Date(), senha: '123456' },
      { email: 'test2@example.com', nome: 'Teste 2', dataNascimento: new Date(), senha: 'abcdef' }
    ];

    employeeServiceSpy.getEmployees.and.returnValue(of(employees));

    fixture.detectChanges();

    expect(employeeServiceSpy.getEmployees).toHaveBeenCalled();
    expect(component.employees).toEqual(employees);
  });

  it('should call removeEmployee when remove button is clicked', () => {
    const removeButton = fixture.nativeElement.querySelector('button');
    spyOn(component, 'removeEmployee');

    removeButton.click();

    expect(component.removeEmployee).toHaveBeenCalled();
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeFormComponent } from './employee-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../employee.service';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;
  let employeeServiceSpy: jasmine.SpyObj<EmployeeService>;

  beforeEach(async () => {
    employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['addEmployee', 'updateEmployee']);

    await TestBed.configureTestingModule({
      declarations: [ EmployeeFormComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        FormBuilder,
        { provide: EmployeeService, useValue: employeeServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.employeeForm.value).toEqual({
      email: '',
      nome: '',
      dataNascimento: null,
      senha: ''
    });
  });

  it('should patch form with employee data on ngOnInit', () => {
    const employeeData = { email: 'test@example.com', nome: 'Teste', dataNascimento: new Date(), senha: '123456' };
    component.employee = employeeData;

    fixture.detectChanges();

    expect(component.employeeForm.value).toEqual(employeeData);
  });

  it('should call addEmployee when submitting with valid data and no employee', () => {
    const addEmployeeSpy = employeeServiceSpy.addEmployee.and.stub();
    const validEmployeeData = { email: 'test@example.com', nome: 'Teste', dataNascimento: new Date(), senha: '123456' };
    component.employeeForm.setValue(validEmployeeData);

    component.onSubmit();

    expect(addEmployeeSpy).toHaveBeenCalledWith(validEmployeeData);
  });

  it('should call updateEmployee when submitting with valid data and an existing employee', () => {
    const updateEmployeeSpy = employeeServiceSpy.updateEmployee.and.stub();
    const validEmployeeData = { email: 'test@example.com', nome: 'Teste', dataNascimento: new Date(), senha: '123456' };
    component.employee = { email: 'old@example.com', nome: 'Old', dataNascimento: new Date(), senha: 'abcdef' };
    component.employeeForm.setValue(validEmployeeData);

    component.onSubmit();

    expect(updateEmployeeSpy).toHaveBeenCalledWith(component.employee, validEmployeeData);
  });

  it('should not call addEmployee or updateEmployee when submitting with invalid data', () => {
    const addEmployeeSpy = employeeServiceSpy.addEmployee.and.stub();
    const updateEmployeeSpy = employeeServiceSpy.updateEmployee.and.stub();
    component.employeeForm.setValue({});

    component.onSubmit();

    expect(addEmployeeSpy).not.toHaveBeenCalled();
    expect(updateEmployeeSpy).not.toHaveBeenCalled();
  });
});
*/