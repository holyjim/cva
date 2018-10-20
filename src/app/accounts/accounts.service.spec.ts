import { AngularFirestore } from '@angular/fire/firestore';
import { TestBed } from '@angular/core/testing';
import { Account, Department, AccountRole } from './accounts.model';
import { Chance } from 'chance';

import { AccountsService } from './accounts.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AppMaterialModule } from '../app.material.module';
import { NotifyService } from '../core/notify.service';


const stubAngularFireAuth = (accountMock, guid): any => {

  const credentialsMock = {
    user: {
      email: accountMock.email,
      uid: guid,
    },
  };

  const fakeAuthState = new BehaviorSubject(null);

  const fakeSignInHandler = (email, password): Promise<any> => {
    fakeAuthState.next(credentialsMock);
    return Promise.resolve(credentialsMock);
  };

  const fakeSignOutHandler = (): Promise<any> => {
    fakeAuthState.next(null);
    return Promise.resolve();
  };

  const angularFireAuthStub = {
    authState: fakeAuthState,
    auth: {
      createUserWithEmailAndPassword: jasmine
        .createSpy('createUserWithEmailAndPassword')
        .and
        .callFake(fakeSignInHandler),
      signInWithEmailAndPassword: jasmine
        .createSpy('signInWithEmailAndPassword')
        .and
        .callFake(fakeSignInHandler),
      signOut: jasmine
        .createSpy('signOut')
        .and
        .callFake(fakeSignOutHandler),
    },
  };

  return angularFireAuthStub;

};

const stubAngularFireStore = (): any => {

  const fakeSet = (doc) => doc;

  const angularFSDocRefStub = {
    set: jasmine
      .createSpy('set')
      .and
      .callFake(fakeSet),
  };
  const fakeDoc = (path) => angularFSDocRefStub;

  const angularFireStoreStub = {
    doc: jasmine
      .createSpy('doc')
      .and
      .callFake(fakeDoc),
  };
  return {
    firestore: angularFireStoreStub,
    docRef: angularFSDocRefStub,
  };
};

describe('AccountsService', () => {
  const chance = Chance();
  let password: string;
  let accountMock: Account;
  let afAuthStub: any;
  let afStoreStub: any;
  let notifyServiceStub: any;
  let guid: string;
  let router: any;
  beforeEach(() => {
    password = chance.word();
    accountMock = {
      email: chance.email(),
      displayName: chance.word(),
      department: Department[chance.pickone(Object.keys(Department))],
      role: AccountRole[chance.pickone(Object.keys(AccountRole))],
    };
    guid = chance.guid();
    afAuthStub = stubAngularFireAuth(accountMock, guid);
    afStoreStub = stubAngularFireStore();
    router = {
      navigate: jasmine.createSpy('navigate'),
    };
    notifyServiceStub = {
      update: jasmine
        .createSpy('notifyServiceSpy')
        .and
        .callFake((title, content, style): void => {}),
    };
    TestBed.configureTestingModule({
      providers: [
        AccountsService,
        { provide: Router, useValue: router },
        { provide: AngularFireAuth, useValue: afAuthStub },
        { provide: AngularFirestore, useValue: afStoreStub.firestore },
        { provide: NotifyService, useValue: notifyServiceStub },
      ],
    });
  });

  it('should map a user', async () => {
    const service: AccountsService = TestBed.get(AccountsService);
    expect(service.account).toBeTruthy();
  });

  it('should be created', () => {
    const service: AccountsService = TestBed.get(AccountsService);
    expect(service).toBeTruthy();
  });

  it('should register a user', async () => {
    const service: AccountsService = TestBed.get(AccountsService);
    await service.register(accountMock, password);
    const expected: Account = {
      ... accountMock,
      uid: guid,
    };
    let account: Observable<Account>;
    account = service.account;

    // expect(account).toEqual(expected);
    expect(afAuthStub.auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
      accountMock.email,
      password
    );
    expect(afStoreStub.firestore.doc).toHaveBeenCalledWith(`accounts/${guid}`);
    const callArg = afStoreStub.docRef.set.calls.argsFor(0)[0];
    expect(callArg).toEqual(expected);

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should login a user', async () => {
    const service: AccountsService = TestBed.get(AccountsService);
    service.login(accountMock.email, password);

    expect(afAuthStub.auth.signInWithEmailAndPassword).toHaveBeenCalledWith(
      accountMock.email,
      password
    );
    // expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should handle firebase login error', async () => {
    const service: AccountsService = TestBed.get(AccountsService);
    const error = new Error(chance.word());
    afAuthStub.auth.signInWithEmailAndPassword.and.throwError(error);
    service.login(accountMock.email, password);

    expect(notifyServiceStub.update).toHaveBeenCalledWith(
      'Error',
      error.message,
      'error'
    );
  });

  it('should handle firebase register error', async () => {
    const service: AccountsService = TestBed.get(AccountsService);
    const error = new Error(chance.word());

    afAuthStub.auth.createUserWithEmailAndPassword.and.throwError(error);
    service.register(accountMock, password);

    expect(notifyServiceStub.update).toHaveBeenCalledWith(
      'Error',
      error.message,
      'error'
    );
  });

  it('should handle updating account error', async () => {
    const service: AccountsService = TestBed.get(AccountsService);
    const error = new Error(chance.word());

    afStoreStub.docRef.set.and.throwError(error);
    service.register(accountMock, password);

    // expect(notifyServiceStub.update).toHaveBeenCalledWith(
    //   'Error',
    //   error.message,
    //   'error'
    // );
  });

});
