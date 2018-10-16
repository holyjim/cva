import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app.material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AccountsRoutingModule } from './accounts-routing.module';
import { RegisterComponent } from './register/register.component';
import { AccountsComponent } from './accounts/accounts.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    AccountsRoutingModule,
    AppMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  declarations: [RegisterComponent, AccountsComponent, LoginComponent],
})
export class AccountsModule { }
