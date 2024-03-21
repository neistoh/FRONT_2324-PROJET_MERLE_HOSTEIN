import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationPanelComponent } from './navigation-panel.component';
import { MatSharedModule } from '../shared-module/mat-shared-module/mat-shared.module';



@NgModule({
  declarations: [
    NavigationPanelComponent
  ],
  imports: [
    CommonModule,
    MatSharedModule
  ],
  exports: [
    NavigationPanelComponent
  ]
})
export class NavigationPanelModule { }
