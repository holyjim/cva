import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Chance } from 'chance';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '../../app.material.module';

import { RegisterComponent } from './register.component';
import { AccountsService } from '../accounts.service';
import { Department, AccountRole } from '../accounts.model';

describe('RegisterComponent', () => {
  const chance = Chance();
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let accountsServiceStub: any;

  beforeEach(async(() => {
    accountsServiceStub = {
      register: jasmine
        .createSpy('register')
        .and
        .callFake((account) => account),
    };
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        AppMaterialModule,
        ReactiveFormsModule,
      ],
      declarations: [ RegisterComponent ],
      providers: [
        RegisterComponent,
        { provide: AccountsService, useValue: accountsServiceStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register account with a given email', async () => {
    const email = chance.email();
    await component.register(email);
    expect(accountsServiceStub.register.calls.argsFor(0)[0]).toEqual({
      email: email,
      displayName: 'Test',
      department: Department.QA,
      role: AccountRole.Participant,
    });
    expect(accountsServiceStub.register.calls.argsFor(0)[1]).toEqual('password');
  });

  it('should register account with a default email', async () => {
    await component.register('');
    expect(accountsServiceStub.register.calls.argsFor(0)[0]).toEqual({
      email: 'test@test.com',
      displayName: 'Test',
      department: Department.QA,
      role: AccountRole.Participant,
    });
    expect(accountsServiceStub.register.calls.argsFor(0)[1]).toEqual('password');
  });
});
