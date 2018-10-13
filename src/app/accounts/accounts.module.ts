import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule,
    AccountsRoutingModule,
  ],
  declarations: [RegisterComponent]
})
export class AccountsModule { }
