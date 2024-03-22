import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from './chat.service';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {Observer} from 'rxjs/internal/types';
import {MessageModel} from '../model/message.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  message = new FormControl('');

  chatId: number = 0;
  messages$: Observable<MessageModel[]> = new Observable<MessageModel[]>;
  souscriptionMere: Subscription = new Subscription();

  constructor(private chatService: ChatService, private readonly route: ActivatedRoute) {
  }

  //Envois un message quand la touche entrée ou que le bouton est appuyé
  sendMessage(): void {
    if (this.message.value !== '') {
      this.chatService.sendMessage(JSON.stringify({
        text: this.message.value!,
        chat: this.chatId,
        user: JSON.parse(atob(sessionStorage.getItem('jwt')!.split('.')[1]))['username'],
        sentAt: new Date()
      }))
      this.message.setValue('');
    }
  }

  ngOnInit(): void {
    this.chatId = +this.route.snapshot.paramMap.get('id')!;

    this.messages$ = new Observable((observer: Observer<MessageModel[]>) => {
      this.chatService.getChatHistory(observer, this.chatId);
    });
    this.souscriptionMere.add(this.messages$.subscribe());
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.souscriptionMere.unsubscribe();
  }

  protected readonly Date = Date;
}
