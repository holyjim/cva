import { Account } from './accounts.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {

  constructor() { }

  async register(user: Account): Promise<Account> {
    return {
      username: user.username,
      department: user.department,
      role: user.role,
    };
  }
}
