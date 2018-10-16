import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Chance } from 'chance';
import { LoginComponent } from './login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '../../app.material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountsService } from '../accounts.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let accountsServiceStub: any;
  const chance = Chance();

  beforeEach(async(() => {
    accountsServiceStub = {
      login: jasmine
        .createSpy('login')
        .and
        .callFake((username, password) => {}),
    };
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        AppMaterialModule,
        ReactiveFormsModule,
      ],
      declarations: [ LoginComponent ],
      providers: [
        LoginComponent,
        { provide: AccountsService, useValue: accountsServiceStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login with a given email', async () => {
    const email = chance.email();
    component.email.setValue(email);
    const password = chance.word();
    component.password.setValue(password);
    await component.login();
    expect(accountsServiceStub.login).toHaveBeenCalledWith(email, password);
  });
});
