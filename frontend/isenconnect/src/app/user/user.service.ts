import { Injectable } from '@angular/core';
import { Observer } from 'rxjs';
import { SharedConstantes } from 'src/shared/shared-constantes.constantes';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }


  //TODO connection au back pour récupérer le data du user
  getUserData(observer: Observer<UserModel>){
    let searchParams = {
      jwt: sessionStorage.getItem('jwt')?.toString()!
    }
    fetch(SharedConstantes.ADDRESS_LOCAL_HOST+':'+SharedConstantes.PORT+'/user?'
    + new URLSearchParams(searchParams), {
      method: 'GET',
      headers: {
          "Content-type": "application/json"
      },
    })
    .then(response => response.json())
    .then(data => {
      const eventData = data.eventData[0]
      let user: UserModel = new UserModel(eventData.nickname,eventData.mail,eventData.name,eventData.firstname,eventData.birthdate,
        eventData.avatar,eventData.status);
      console.log(user);
      observer.next(user);
    })
    .catch(function(error) {
      console.log('Request failed', error);
      observer.next(new UserModel('','','','',new Date(),'',''));
    });
  }

  addEventToFavorites(eventId:string){
    const body = {
      jwt: sessionStorage.getItem('jwt'),
      eventId: eventId
    }

    fetch(SharedConstantes.ADDRESS_LOCAL_HOST+':'+SharedConstantes.PORT+'/user/addFavorites/', {
      method: 'POST',
      headers: {
          "Content-type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(function(error) {
      console.log('Request failed', error);
    });
  }

}
