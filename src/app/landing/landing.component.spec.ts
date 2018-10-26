import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComponent } from './landing.component';
import { Department, AccountRole, Account } from '../accounts/accounts.model';
import { Chance } from 'chance';
import { from } from 'rxjs';
import { AccountsService } from '../accounts/accounts.service';


describe('LandingComponent', () => {
  const chance = Chance();
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

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
      declarations: [ LandingComponent ],
      providers: [
        LandingComponent,
        { provide: AccountsService, useValue: accountsServiceStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'cva'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('cva');
  });

  it('should render title in a h1 tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to cva!');
  });
});
