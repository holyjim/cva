import { Account } from './accounts.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) { }

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

  async login(username: string, password: string) {

  }
}
