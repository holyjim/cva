import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts/accounts.service';
import { Observable, of } from 'rxjs';
import { Account } from '../accounts/accounts.model';

@Component({
  selector: 'cva-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  title = 'cva';

  account$: Observable<Account>;

  constructor(private accountsService: AccountsService) {
    this.account$ = accountsService.account;


  }

  ngOnInit() {
  }

}
