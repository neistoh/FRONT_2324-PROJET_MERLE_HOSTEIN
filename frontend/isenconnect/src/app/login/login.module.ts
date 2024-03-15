import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MatSharedModule } from 'src/shared/shared-module/mat-shared-module/mat-shared.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MatSharedModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
