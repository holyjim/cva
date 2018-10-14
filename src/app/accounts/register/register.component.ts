import { AccountsService } from './../accounts.service';
import { Component, OnInit } from '@angular/core';
import { Department, AccountRole } from '../accounts.model';

@Component({
  selector: 'cva-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {

  constructor(private accountsService: AccountsService) { }

  ngOnInit() {
  }

  register(email: string) {
    this.accountsService.register({
      email: email ? email : 'test@test.com',
      displayName: 'Test',
      department: Department.QA,
      role: AccountRole.Participant,
    }, 'password');
  }
}
