import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { MatSharedModule } from 'src/shared/shared-module/mat-shared-module/mat-shared.module';



@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    MatSharedModule
  ]
})
export class AccountModule { }
