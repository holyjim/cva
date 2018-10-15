import { AccountsService } from './../accounts.service';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Department, AccountRole } from '../accounts.model';

@Component({
  selector: 'cva-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;

  // extract values
  depts = Department;
  departments(): Array<string> {
    return Object.keys(this.depts);
}
  constructor(private accountsService: AccountsService, public fb: FormBuilder) { }

  ngOnInit() {
    // First Step
    this.registrationForm = this.fb.group({
      'displayName': ['', [
        Validators.required,
        ],
      ],
      'department': ['', [
        Validators.required,
        ],
      ],
      'email': ['', [
        Validators.required,
        Validators.email,
        ],
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
        ],
      ],
      'region': ['', [
        ],
      ],
    });
  }
  get displayName() { return this.registrationForm.get('displayName'); }
  get department() { return this.registrationForm.get('department'); }
  get email() { return this.registrationForm.get('email'); }
  get password() { return this.registrationForm.get('password'); }

  async register() {
    await this.accountsService.register({
      email: this.email.value,
      displayName: 'Test',
      department: Department.QA,
      role: AccountRole.Participant,
    }, 'password');
  }
}
