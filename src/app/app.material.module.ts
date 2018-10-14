import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, } from '@angular/material';

const matModules = [ MatButtonModule, MatCheckboxModule, MatToolbarModule,  ];

@NgModule({
  imports: [ matModules ],
  exports: [ matModules ],
})
export class AppMaterialModule { }
