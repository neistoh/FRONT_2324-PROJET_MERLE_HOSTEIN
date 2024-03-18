import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcceuilComponent } from './acceuil.component';
import { MatSharedModule } from 'src/shared/shared-module/mat-shared-module/mat-shared.module';



@NgModule({
  declarations: [
    AcceuilComponent
  ],
  imports: [
    CommonModule,
    MatSharedModule
  ],
  exports: [
    AcceuilComponent
  ]
})
export class AcceuilModule { }
