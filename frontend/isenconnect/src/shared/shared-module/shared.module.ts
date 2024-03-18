import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from 'src/app/login/login.module';
import { NavigationPanelModule } from '../navigation-panel/navigation-panel.module';
import { AcceuilModule } from 'src/app/acceuil/acceuil.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LoginModule,
    NavigationPanelModule,
    AcceuilModule
  ],
  exports: [
    LoginModule,
    NavigationPanelModule,
  ]
})
export class SharedModule { }
