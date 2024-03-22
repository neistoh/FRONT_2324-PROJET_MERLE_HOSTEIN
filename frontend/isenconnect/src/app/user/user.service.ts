import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { SharedConstantes } from 'src/shared/shared-constantes.constantes';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }


  /**
   * Permet de récupérer les data de l'utilisateur actuel
   * @param observer 
   */
  getUserData(observer: Observer<UserModel>){
    let searchParams = {
      jwt: sessionStorage.getItem('jwt')?.toString()!
    }
    fetch(SharedConstantes.ADDRESS_RENDER+':'+SharedConstantes.PORT+'/user?'
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

  /**
   * Permet d'ajouter un event au favoris de l'utilisateur
   * @param eventId 
   */
  addEventToFavorites(eventId:string){
    const body = {
      jwt: sessionStorage.getItem('jwt'),
      eventId: eventId
    }

    fetch(SharedConstantes.ADDRESS_RENDER+':'+SharedConstantes.PORT+'/user/addFavorites/', {
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


  /**
   * Permet d'ajouter un utilisateur si il n'existe pas d'utilisateur avec le même nickname
   * @param body 
   */
  addUser(body: any){
    this.doesUserExist(body.nickname).then(result=>{
      console.log(result);
      if(!result){
        fetch(SharedConstantes.ADDRESS_RENDER+':'+SharedConstantes.PORT+'/user/addUser/', {
          method: 'POST',
          headers: {
              "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => {
          console.log(data.eventData);
        })
        .catch(function(error) {
          console.log('Request failed', error);
        });
      }
    });   
  }

  /**
   * Permet de récupérer si un utilisateur existe avec un nickname
   * @param nickname 
   * @returns 
   */
  doesUserExist(nickname: string): Promise<boolean>{
    const searchParams = {
      nickname: nickname
    }

    return fetch(SharedConstantes.ADDRESS_RENDER+':'+SharedConstantes.PORT+'/user/?'
    + new URLSearchParams(searchParams), {
      method: 'GET',
      headers: {
          "Content-type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.eventData);
      return data.eventData.length > 0;
    })
    .catch(function(error) {
      console.log('Request failed', error);
      return true;
    });
  }

}
