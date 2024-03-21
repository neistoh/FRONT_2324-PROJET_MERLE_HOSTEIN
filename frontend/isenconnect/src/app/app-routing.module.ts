import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { appRoutingGuard } from './app-routing.guard';
import { EventConsultComponent } from './event-consult/event-consult.component';
import { ChatComponent } from './chat/chat.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'acceuil', component: AcceuilComponent, canActivate: [appRoutingGuard]},
  { path: 'eventConsult/:id', component: EventConsultComponent, canActivate: [appRoutingGuard]},
  { path: 'chat/:id', component: ChatComponent, canActivate: [appRoutingGuard]},
  { path: 'account', component: AccountComponent, canActivate: [appRoutingGuard]}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
