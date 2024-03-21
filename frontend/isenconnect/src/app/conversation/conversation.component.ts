import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserModel } from '../model/user.model';
import { EventService } from '../event/event.service';
import { Router } from '@angular/router';
import { Observable, Observer, Subscription } from 'rxjs';
import { ConversationModel } from './conversation.model';
import { ChatService } from '../chat/chat.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit, OnDestroy{
  user: UserModel = new UserModel('','','','',new Date(),'','');

  conversation$: Observable<ConversationModel[]> = new Observable<ConversationModel[]>

  souscriptionMere: Subscription = new Subscription();

  constructor(
    private readonly router: Router,
    private readonly chatServicePipe: ChatService
  ){
    this.user.nickname = JSON.parse(atob(sessionStorage.getItem('jwt')!.split('.')[1]))['username'];
  }
  


  ngOnInit(): void {
    this.conversation$ = new Observable((observer: Observer<ConversationModel[]>)=>{
      this.chatServicePipe.getConversation(observer);
    })

    this.souscriptionMere.add(this.conversation$.subscribe());
  }
  

  gotToConvo(convoId: string){
    
  }
  
  ngOnDestroy(): void {
    this.souscriptionMere.unsubscribe();
  }
}
