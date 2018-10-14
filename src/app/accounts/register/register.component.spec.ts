import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AccountsService } from '../accounts.service';

describe('RegisterComponent', () => {
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
});
