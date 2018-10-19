import { Account } from './accounts.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { NotifyService } from '../core/notify.service';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {

  account: Observable<Account>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private notify: NotifyService) {
    this.account = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<Account>(`accounts/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async updateAccount(account: Account) {
    const accountRef: AngularFirestoreDocument<any> = this.afs.doc(`accounts/${account.uid}`);
    return accountRef.set(account, { merge: true });
  }

  async register(account: Account, password: string): Promise<void> {
    // try to create a user
    try {
      const credential = await this.afAuth.auth.createUserWithEmailAndPassword(
        account.email,
        password
      );
      account.uid = credential.user.uid;
    } catch (error) {
      this.handleError(error);
      return;
    }

    try {
      await this.updateAccount(account);
      // redirect to somewhere
      this.router.navigate(['/']);
    } catch (error) {
      this.handleError(error);
      return;
    }
  }

  async login(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      // redirect to somewhere
      this.router.navigate(['/']);
    } catch (error) {
      this.handleError(error);
      return;
    }
  }

  // If error, console log and notify user
  private handleError(error) {
    this.notify.update('Error', error.message, 'error');
  }
}
