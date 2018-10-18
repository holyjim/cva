import { AccountsService } from './../accounts.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Department, AccountRole, Account } from '../accounts.model';
import { Subscription, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'cva-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  account$: Observable<Account>;
  depts = Department;

  constructor(private accountsService: AccountsService, private fb: FormBuilder) { }

  ngOnInit() {
    // First Step
    this.profileForm = this.fb.group({
      'displayName': ['', [
        Validators.required,
        ],
      ],
      'department': ['', [
        Validators.required,
        ],
      ],
      'email': new FormControl({value: '', disabled: true}, [
        Validators.required,
      ]),
      'role': new FormControl({value: '', disabled: true}, [
        Validators.required,
      ]),
    });
    this.account$ = this.accountsService.account.pipe(
      tap(user => this.profileForm.patchValue(user))
    );
  }

  departments(): Array<string> { return Object.keys(this.depts); }

  get displayName() { return this.profileForm.get('displayName'); }
  get department() { return this.profileForm.get('department'); }
  get email() { return this.profileForm.get('email'); }

  async update(uid, email, role) {
    await this.accountsService.updateAccount({
      uid: uid,
      email: email,
      displayName: this.displayName.value,
      department: this.department.value,
      role: role,
    });
  }

}
