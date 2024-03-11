import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/login/login.component';
import { LoginModule } from 'src/app/login/login.module';
import { NavigationPanelModule } from '../navigation-panel/navigation-panel.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LoginModule,
    NavigationPanelModule
  ],
  exports: [
    LoginModule,
    NavigationPanelModule
  ]
})
export class SharedModule { }
