import { AngularFirestore } from '@angular/fire/firestore';
import { TestBed } from '@angular/core/testing';
import { Account, Department, AccountRole } from './accounts.model';
import { Chance } from 'chance';

import { AccountsService } from './accounts.service';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';


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
  let guid: string;

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
    TestBed.configureTestingModule({
      providers: [
        AccountsService,
        { provide: AngularFireAuth, useValue: afAuthStub },
        { provide: AngularFirestore, useValue: afStoreStub.firestore },
      ],
    });
  });

  it('should be created', () => {
    const service: AccountsService = TestBed.get(AccountsService);
    expect(service).toBeTruthy();
  });

  it('should register a user', async () => {
    const service: AccountsService = TestBed.get(AccountsService);
    const account = await service.register(accountMock, password);
    const expected: Account = {
      ... accountMock,
      uid: guid,
    };
    expect(account).toEqual(expected);
    expect(afAuthStub.auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
      accountMock.email,
      password
    );
    expect(afStoreStub.firestore.doc).toHaveBeenCalledWith(`accounts/${guid}`);
    const callArg = afStoreStub.docRef.set.calls.argsFor(0)[0];
    expect(callArg).toEqual(expected);
  });

  it('should login a user', async () => {
    const service: AccountsService = TestBed.get(AccountsService);
    service.login(accountMock.email, password);
  });

});
