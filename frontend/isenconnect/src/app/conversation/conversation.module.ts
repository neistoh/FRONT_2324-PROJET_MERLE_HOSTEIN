import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationComponent } from './conversation.component';
import { MatSharedModule } from 'src/shared/shared-module/mat-shared-module/mat-shared.module';



@NgModule({
  declarations: [
    ConversationComponent
  ],
  imports: [
    CommonModule,
    MatSharedModule
  ]
})
export class ConversationModule { }
