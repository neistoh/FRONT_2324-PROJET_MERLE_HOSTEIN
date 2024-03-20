import { Injectable } from '@angular/core';
import { EMPTY, Observable, Observer } from 'rxjs';
import { SharedConstantes } from 'src/shared/shared-constantes.constantes';
import { EventModel } from '../model/event.model';
import { UserModel } from '../model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private readonly router: Router
  ) { }


  /**
   * Permet de récupérer la liste des event filtré
   * @param observer
   * @param filtre filtre de la recherche
   */
  getEventByFiltre(observer: Observer<EventModel[]>,filtre: any): any{
    let searchParams = {
      theme:'',
      price:'',
      name:'',
      tri: '',
      ordre:'-1'
    }
    filtre.theme?searchParams.theme=filtre.theme:'';
    filtre.name?searchParams.name=filtre.name:'';
    filtre.price?searchParams.price=filtre.price:'';
    filtre.ordre?searchParams.ordre=filtre.ordre:'';
    filtre.tri?searchParams.tri=filtre.tri:'';

    fetch(SharedConstantes.ADDRESS_LOCAL_HOST+':'+SharedConstantes.PORT+'/event/filtre?' 
    + new URLSearchParams(searchParams), {
      method: 'GET',
      headers: {
          "Content-type": "application/json"
      },
    })
    .then(response => response.json())
    .then(data => {
      let listeEvents: EventModel[] = [];
      data.eventData.forEach((element: EventModel) => {
        let eventFetch: EventModel = new EventModel(element._id,element.name,element.price,element.date,
          element.image,element.theme);
        listeEvents.push(eventFetch);
      });
      observer.next(listeEvents);
    })
    .catch(function(error) {
      console.log('Request failed', error);
      observer.next([]);
    });
  }

  /**
   * Permet de récupérer un event grace à son _id
   * @param observer 
   * @param id 
   */
  getEventById(observer: Observer<EventModel>,id: number): any{
    fetch(SharedConstantes.ADDRESS_LOCAL_HOST+':'+SharedConstantes.PORT+'/event/'+id, {
      method: 'GET',
      headers: {
          "Content-type": "application/json"
      },
    })
    .then(response => response.json())
    .then(data => {
      observer.next(data.eventData[0]);
    })
    .catch(function(error) {
      console.log('Request failed', error);
      observer.next(new EventModel(0,'',0,new Date(),'',''));
    });
  }


  getUserFavorites(observer: Observer<UserModel[]>,id: number): any{
    fetch(SharedConstantes.ADDRESS_LOCAL_HOST+':'+SharedConstantes.PORT+'/event/favorites/'+id, {
      method: 'GET',
      headers: {
          "Content-type": "application/json"
      },
    })
    .then(response => response.json())
    .then(data => {
      let userList: UserModel[] = [];
      console.log(data);
      data.eventData.forEach((user: any)=>{
        console.log(user);
        let newUser = new UserModel(user.user,'','','',new Date(),'');
        userList.push(newUser);
      })
      console.log(userList);
      observer.next(userList);
    })
    .catch(function(error) {
      console.log('Request failed', error);
      observer.next([]);
    });
  }

  getEventOwner(observer: Observer<boolean> ,eventId: number){
    let searchParams = {
      eventId: eventId.toString(),
      jwt: sessionStorage.getItem('jwt')?.toString()!
    }
    fetch(SharedConstantes.ADDRESS_LOCAL_HOST+':'+SharedConstantes.PORT+'/event/ownership?'
    + new URLSearchParams(searchParams), {
      method: 'GET',
      headers: {
          "Content-type": "application/json"
      },
    })
    .then(response => response.json())
    .then(data => {
      observer.next(data.eventData);
    })
    .catch(function(error) {
      console.log('Request failed', error);
      observer.next(false);
    });
  }

  updateEvent(observer: Observer<EventModel>, eventId: string, body: {}){
    console.log(eventId + body);
    fetch(SharedConstantes.ADDRESS_LOCAL_HOST+':'+SharedConstantes.PORT+'/event/'+eventId
    , {
      method: 'PUT',
      headers: {
          "Content-type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.eventData);
      observer.next(data.eventData[0]);
    })
    .catch(function(error) {
      console.log('Request failed', error);
      observer.next(new EventModel(0,'',0,new Date(),'',''));
    });
  }
}
