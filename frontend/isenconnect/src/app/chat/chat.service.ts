import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { io } from 'socket.io-client';
import { SharedConstantes } from 'src/shared/shared-constantes.constantes';
import { ConversationModel } from '../conversation/conversation.model';

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

  getConversation(observer: Observer<ConversationModel[]>){
    console.log("Applele")
    let searchParams = {
      jwt: sessionStorage.getItem('jwt')?.toString()!
    }
    fetch(SharedConstantes.ADDRESS_LOCAL_HOST+':'+SharedConstantes.PORT+'/chat?'
    + new URLSearchParams(searchParams), {
      method: 'GET',
      headers: {
          "Content-type": "application/json"
      },
    })
    .then(response => response.json())
    .then(data => {
      let listeConvo: ConversationModel[] = [];
      data.eventData.forEach((element: any) => {
        let convoFetch: ConversationModel = new ConversationModel(element.name,element.image,element._id,
          element.user1,element.user2);
        listeConvo.push(convoFetch);
      });
      observer.next(listeConvo);
    })
    .catch(function(error) {
      console.log('Request failed', error);
      observer.next([]);
    });
  }

}