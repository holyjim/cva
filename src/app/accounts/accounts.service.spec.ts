import { TestBed } from '@angular/core/testing';
import { Account, Department, AccountRole } from './accounts.model';
import { Chance } from 'chance';

import { AccountsService } from './accounts.service';

describe('AccountsService', () => {
  const chance = Chance();
  let account: Account;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    account = {
      username: chance.email(),
      password: chance.word(),
      department: Department[chance.pickone(Object.keys(Department))],
      role: AccountRole[chance.pickone(Object.keys(AccountRole))],
    };
  });

  it('should be created', () => {
    const service: AccountsService = TestBed.get(AccountsService);
    expect(service).toBeTruthy();
  });

  it('should register a user and return a user without password', async () => {
    const service: AccountsService = TestBed.get(AccountsService);
    const user = await service.register(account);
    expect(user).toEqual({
      username: account.username,
      department: account.department,
      role: account.role,
    });
    expect(user).not.toContain('password');
  });

});
