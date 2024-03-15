import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from 'src/app/login/login.module';
import { NavigationPanelModule } from '../navigation-panel/navigation-panel.module';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LoginModule,
    NavigationPanelModule,
    MatFormFieldModule
  ],
  exports: [
    LoginModule,
    NavigationPanelModule,
    MatFormFieldModule
  ]
})
export class SharedModule { }
