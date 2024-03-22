import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {io} from 'socket.io-client';
import {ChatModel} from '../model/chat.model';
import {SharedConstantes} from 'src/shared/shared-constantes.constantes';
import {ConversationModel} from '../conversation/conversation.model';
import {MessageModel} from '../model/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: any;

  constructor() {
    this.socket = io(SharedConstantes.ADDRESS_RENDER + ":" + SharedConstantes.PORT);
  }

  sendMessage(message: string): void {
    this.socket.emit('postMessage', message, (response: any) => {
      console.log(response);
    });
  }

  getChatHistory(observer: Observer<MessageModel[]>, id: number): string[] | any {
    setInterval(() => {
      console.log("ICI");
      this.socket.emit('getChat', id, (response: any) => {
        let listMessages: MessageModel[] = [];
        response.forEach((message: any) => {
          listMessages.push(new MessageModel(message._id, message.text, message.chat, message.user, message.sentAt))
        })
        observer.next(listMessages);
      })
    }, 2000);
  }

  receiveMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('postMessage', (data: any) => {
        observer.next(data);
      });
    });
  }

  getConversation(observer: Observer<ConversationModel[]>) {
    console.log("Applele")
    let searchParams = {
      jwt: sessionStorage.getItem('jwt')?.toString()!
    }
    fetch(SharedConstantes.ADDRESS_RENDER + ':' + SharedConstantes.PORT + '/chat?'
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
          let convoFetch: ConversationModel = new ConversationModel(element.name, element.image, element._id,
            element.user1, element.user2);
          listeConvo.push(convoFetch);
        });
        observer.next(listeConvo);
      })
      .catch(function (error) {
        console.log('Request failed', error);
        observer.next([]);
      });
  }

}
