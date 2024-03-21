import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.css']
})
export class NavigationPanelComponent {

  constructor(
    private readonly router: Router
  ){}

  routeAcceuil(){
    this.router.navigateByUrl('/acceuil');
  }

  routeConvo(){
    this.router.navigateByUrl('/conversation');
  }

  routeAccount(){
    this.router.navigateByUrl('/account');
  }

  deconnect(){
    sessionStorage.removeItem('jwt');
    this.router.navigateByUrl('/');
  }
}
