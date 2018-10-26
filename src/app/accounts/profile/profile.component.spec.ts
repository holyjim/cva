import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { from } from 'rxjs';
import { Department, AccountRole, Account } from '../accounts.model';
import {Chance} from 'chance';
import { AccountsService } from '../accounts.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '../../app.material.module';
import { ReactiveFormsModule } from '@angular/forms';


describe('ProfileComponent', () => {
  const chance = Chance();
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let accountsServiceStub: any;
  let accountMock: Account;

  beforeEach(async(() => {
    accountMock = {
      uid: chance.guid(),
      email: chance.email(),
      displayName: chance.word(),
      department: Department[chance.pickone(Object.keys(Department))],
      role: AccountRole[chance.pickone(Object.keys(AccountRole))],
    };
    accountsServiceStub = {
      updateAccount: jasmine
        .createSpy('updateAccount')
        .and
        .callFake(() => {}),
      account: from([accountMock]),
    };
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        AppMaterialModule,
        ReactiveFormsModule,
      ],
      declarations: [ ProfileComponent ],
      providers: [
        ProfileComponent,
        { provide: AccountsService, useValue: accountsServiceStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update account with a given display name', async () => {
    const displayName = chance.name();
    const dept = Department[chance.pickone(Object.keys(Department))];

    component.displayName.setValue(displayName);
    component.department.setValue(dept);

    await component.update(accountMock.uid, accountMock.email, accountMock.role);
    expect(accountsServiceStub.updateAccount.calls.argsFor(0)[0]).toEqual({
      email: accountMock.email,
      displayName: displayName,
      department: dept,
      role: accountMock.role,
      uid: accountMock.uid,
    });
  });

  it('should fill form values from account', async () => {
    const displayName = chance.name();
    const dept = Department[chance.pickone(Object.keys(Department))];

    component.displayName.setValue(displayName);
    component.department.setValue(dept);

    await component.update(accountMock.uid, accountMock.email, accountMock.role);
    expect(accountsServiceStub.updateAccount.calls.argsFor(0)[0]).toEqual({
      email: accountMock.email,
      displayName: displayName,
      department: dept,
      role: accountMock.role,
      uid: accountMock.uid,
    });
  });
});
