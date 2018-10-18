import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cva-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {

  navLinks = [
    {
      path: './login',
      label: 'Login',
    },
    {
      path: './register',
      label: 'Register',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
