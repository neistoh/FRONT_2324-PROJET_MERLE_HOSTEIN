import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from 'src/app/login/login.module';
import { NavigationPanelModule } from '../navigation-panel/navigation-panel.module';
import { AcceuilModule } from 'src/app/acceuil/acceuil.module';
import { EventConsultModule } from 'src/app/event-consult/event-consult.module';
import { AccountModule } from 'src/app/account/account.module';
import { ChatModule } from 'src/app/chat/chat.module';
import { ConversationModule } from 'src/app/conversation/conversation.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LoginModule,
    NavigationPanelModule,
    AcceuilModule,
    EventConsultModule,
    ChatModule,
    AccountModule,
    ConversationModule
  ],
  exports: [
    LoginModule,
    NavigationPanelModule,
  ]
})
export class SharedModule { }
