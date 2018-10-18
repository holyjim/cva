import { Account } from './accounts.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {

  account: Observable<Account>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) { 
    this.account = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<Account>(`accounts/${user.uid}`).valueChanges()
        } else {
          return of(null);
        }
      })
    )
  }

  async updateAccount(account: Account) {
    const accountRef: AngularFirestoreDocument<any> = this.afs.doc(`accounts/${account.uid}`);
    return accountRef.set(account, { merge: true });
  }

  async register(account: Account, password: string): Promise<Account> {

    const credential = await this.afAuth.auth.createUserWithEmailAndPassword(
      account.email,
      password
    );
    account.uid = credential.user.uid;
    await this.updateAccount(account);
    return account;
  }

  async login(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
      return;
    }
    // redirect to somewhere
    console.log('logged in!');
  }
}
