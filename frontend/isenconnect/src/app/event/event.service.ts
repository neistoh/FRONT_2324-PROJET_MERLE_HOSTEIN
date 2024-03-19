import { Injectable } from '@angular/core';
import { SharedConstantes } from 'src/shared/shared-constantes.constantes';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }


  /**
   * Permet de récupérer la liste des event filtré
   * @param filtre filtre de la recherche
   */
  getEventByFiltre(filtre: any){
    let searchParams = {
      theme:'',
      price:'',
      name:''
    }
    filtre.theme?searchParams.theme=filtre.theme:'';
    filtre.date?searchParams.name=filtre.name:'';
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
      console.log(data);
    })
    .catch(function(error) {
      console.log('Request failed', error);
    });
  }
}
