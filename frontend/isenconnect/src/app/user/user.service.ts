import { Injectable } from '@angular/core';
import { SharedConstantes } from 'src/shared/shared-constantes.constantes';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }


  //TODO connection au back pour récupérer le data du user
  getUserData(){

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
