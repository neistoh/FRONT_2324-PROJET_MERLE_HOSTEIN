import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { SharedConstantes } from 'src/shared/shared-constantes.constantes';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: any;
  
  constructor() {
    this.socket = io(SharedConstantes.ADDRESS_LOCAL_HOST + ":" + SharedConstantes.PORT);
  }

  sendMessage(message: string): void {
    this.socket.emit('postMessage', message);
  }

  getChatHistory(): string[] | any {
    this.socket.emit('postMessage', {data: "someData"}, (res: any) => {
      console.log(res)
      return res
    })
  }

  receiveMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('postMessage', (data: any) => {
        observer.next(data);
      });
    });
  }

}