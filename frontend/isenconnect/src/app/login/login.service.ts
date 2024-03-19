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

  connect(pseudo: string | null, password: string | null, route: string){
    let jwtSign;
    sessionStorage.getItem('jwt')? jwtSign=sessionStorage.getItem('jwt') : jwtSign=''; 
    fetch(SharedConstantes.ADDRESS_LOCAL_HOST+':'+SharedConstantes.PORT+'/user/connect', {
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
      if(data['jwt'] === sessionStorage.getItem('jwt') && data['droits'] === 'W'){
        this.router.navigateByUrl(route);
      }else if(data['droits'] === 'W'){
        sessionStorage.setItem('jwt',data['jwt']);
        this.router.navigateByUrl(route);
      }else if(data["error"]){
        console.log(data["error"]);
        if(data["action"] === "removeJwt"){
          sessionStorage.removeItem('jwt');
        }
      }
    })
    .catch(function(error) {
      console.log('Request failed', error);
    });
  }
}
