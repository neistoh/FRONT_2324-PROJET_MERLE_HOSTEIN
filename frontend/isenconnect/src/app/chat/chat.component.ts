import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  message = new FormControl('');
  
  messages: string[] = [];

  constructor(private chatService: ChatService) { }

  sendMessage(): void {
    if(this.message.value !== '') {
      this.chatService.sendMessage(JSON.stringify({
        text: this.message.value!,
        chat: "1",
        user: "test",
        sentAt: new Date()
      }))
      this.message.setValue('');
    }
  }

  ngOnInit(): void {
    this.chatService.getChatHistory().subscribe((data: string[]) => {
      this.messages = data;
    });

    this.chatService.receiveMessage().subscribe(data => {
      this.messages.push(data);
    });

    this.chatService.sendMessage(JSON.stringify({
      text: "Test",
      chat: "1",
      user: "test",
      sentAt: new Date()
    }))
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}
