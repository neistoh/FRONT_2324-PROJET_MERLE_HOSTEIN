import { Injectable } from '@angular/core';
import { EMPTY, Observable, Observer } from 'rxjs';
import { SharedConstantes } from 'src/shared/shared-constantes.constantes';
import { EventModel } from '../model/event.model';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }


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
        console.log(element);
        let eventFetch: EventModel = new EventModel(element._id,element.name,element.price,element.date,
          element.image,element.theme);
        listeEvents.push(eventFetch);
      });
      console.log(listeEvents);
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
      console.log(data.eventData);
      observer.next(data.eventData[0]);
    })
    .catch(function(error) {
      console.log('Request failed', error);
      observer.next([]);
    });
  }
}
