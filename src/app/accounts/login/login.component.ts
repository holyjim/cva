import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cva-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private accountsService: AccountsService, public fb: FormBuilder) { }

  ngOnInit() {
    // First Step
    this.loginForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email,
        ],
      ],
      'password': ['', [
        Validators.required,
        ],
      ],
    });
  }
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  async register() {
    await this.accountsService.login(
      this.email.value,
      this.password.value
    );
  }

}
