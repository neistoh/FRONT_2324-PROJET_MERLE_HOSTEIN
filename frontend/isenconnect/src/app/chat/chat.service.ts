import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: any;
  
  constructor() {
    this.socket = io('http://localhost:3000');
  }

  sendMessage(message: string): void {
    this.socket.emit('chatMessage', message);
  }

  getChatHistory(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('chatHistory', (data: any) => {
        observer.next(data);
      });
    });
  }

  receiveMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('chatMessage', (data: any) => {
        observer.next(data);
      });
    });
  }

}