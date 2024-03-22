import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs/internal/types';
import { ChatModel } from '../model/chat.model';
import { MessageModel } from '../model/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  message = new FormControl('');

  chatId:number = 0;
  chat$:Observable<ChatModel> = new Observable<ChatModel>;

  messages$: Observable<MessageModel[]> = new Observable<MessageModel[]>;
  souscriptionMere: Subscription = new Subscription();

  constructor(private chatService: ChatService, private readonly route: ActivatedRoute) { }

  sendMessage(): void {
    if(this.message.value !== '') {
      this.chatService.sendMessage(JSON.stringify({
        text: this.message.value!,
        chat: this.chatId,
        user: "test",
        sentAt: new Date()
      }))
      this.message.setValue('');
    }
  }

  ngOnInit(): void {
    this.chatId = +this.route.snapshot.paramMap.get('id')!;

    this.messages$ = new Observable((observer:Observer<MessageModel[]>)=>{
      console.log("Souscription");
      this.chatService.getChatHistory(observer,this.chatId);
    });
    this.souscriptionMere.add(this.messages$.subscribe());
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.souscriptionMere.unsubscribe();
  }

}
