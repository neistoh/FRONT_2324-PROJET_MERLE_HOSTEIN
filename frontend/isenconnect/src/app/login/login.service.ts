import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedConstantes } from 'src/shared/shared-constantes.constantes';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private readonly router: Router
  ) { }

  /**
   * Permet de savoir si l'utilisateur à le droit de ce connecter en fonction de son pseudo et de son mot de passe
   * ou en fonction de son jwt (il c'est déjà connécté une fois)
   * @param pseudo 
   * @param password 
   * @param route 
   */
  connect(pseudo: string | null, password: string | null, route: string){
    let jwtSign;
    sessionStorage.getItem('jwt')? jwtSign=sessionStorage.getItem('jwt') : jwtSign='';
    fetch(SharedConstantes.ADDRESS_RENDER+'/user/connect', {
      method: 'POST',
      headers: {
          "Content-type": "application/json"
      },
      body: JSON.stringify({
        nickname: pseudo,
        password: password,
        jwt: jwtSign
      })
    })
    .then(response => {
      if(response.status===401){
        this.router.navigateByUrl('');
      }else if(response.status === 404){
        this.router.navigateByUrl('');
      }
      return response.json()})
    .then(data => {
      //Si l'utilisateur à un jwt et à le droit de ce connecter et route l'utilisateur
      //Sinon si aucun jwt existe on le créer et route l'utilisateur
      //Sinon l'utilisateur n'a pas le droit ce connecter
      if(data['jwt'] === sessionStorage.getItem('jwt') && data['droits'] === 'W'){
        sessionStorage.setItem('nickname',data['nickname'])
        this.router.navigateByUrl(route);
      }else if(data['droits'] === 'W'){
        sessionStorage.setItem('jwt',data['jwt']);
        this.router.navigateByUrl(route);
      }else if(data['error']){
        console.log(data['error']);
        if(data['action'] === 'removeJwt'){
          sessionStorage.removeItem('jwt');
        }
      }
    })
    .catch(function(error) {
      console.log('Request failed', error);
    });
  }
}
