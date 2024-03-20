import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSharedModule } from 'src/shared/shared-module/mat-shared-module/mat-shared.module';
import { EventConsultComponent } from './event-consult.component';



@NgModule({
  declarations: [
    EventConsultComponent
  ],
  imports: [
    CommonModule,
    MatSharedModule
  ],
  exports: [
    EventConsultComponent
  ]
})
export class EventConsultModule { }
