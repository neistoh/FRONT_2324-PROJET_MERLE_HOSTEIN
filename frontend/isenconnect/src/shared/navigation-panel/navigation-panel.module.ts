import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationPanelComponent } from './navigation-panel.component';



@NgModule({
  declarations: [
    NavigationPanelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavigationPanelComponent
  ]
})
export class NavigationPanelModule { }
