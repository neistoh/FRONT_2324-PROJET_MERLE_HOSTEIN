import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { MatSharedModule } from 'src/shared/shared-module/mat-shared-module/mat-shared.module';



@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    MatSharedModule
  ]
})
export class ChatModule { }
