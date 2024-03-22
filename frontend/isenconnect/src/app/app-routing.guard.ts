import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from './login/login.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class appRoutingGuard{

  constructor(
    private readonly loginServicePipe: LoginService,
    private readonly router: Router
  ){}

  canActivate (route: ActivatedRouteSnapshot,state: RouterStateSnapshot){
    //Si l'utilisateur n'a pas de jwt alors on le renvois a la page de login sinon on 
    //regarde qi il a le droit de ce connecter
    if(!sessionStorage.getItem('jwt')){
      console.log("Pas de jwt");
      this.router.navigateByUrl('');
      return;
    }

    this.loginServicePipe.connect('','',route.url.join('/').toString());
  };
}
