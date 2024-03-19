import {Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { EventService } from '../event/event.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit, OnDestroy {
  user: User = new User();



  constructor(
    private readonly eventServicePipe: EventService
  ){
    this.user.username = 'Test';
  }
  

  ngOnInit(): void {
    const filtre = {
      "theme": "music",
      "price": 10
    }
    console.log("Appel de servicePipe");
    this.eventServicePipe.getEventByFiltre(filtre);
  }

  scrollEventRight(){
    let container = document.getElementById("scrollContainer");
    let distance = document.getElementById("event")?.clientWidth.valueOf();
    if(container && container.scrollLeft < container.offsetWidth){
      distance !== undefined ? container.scrollLeft += distance : container.scrollLeft += 100;
      console.log(container.scrollLeft);
    }
  }


  scrollEventLeft(){
    let container = document.getElementById("scrollContainer");
    let distance = document.getElementById("event")?.clientWidth.valueOf();
    if(container && container.scrollLeft>0){
      distance !== undefined ? container.scrollLeft -= distance : container.scrollLeft -= 100;
      console.log(container.scrollLeft);
    }
  }


  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
