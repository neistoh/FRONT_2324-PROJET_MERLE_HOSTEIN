import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Observer, Subscription } from 'rxjs';
import { EventModel } from '../model/event.model';
import { EventService } from '../event/event.service';
import { UserModel } from '../model/user.model';

@Component({
  selector: 'app-event-consult',
  templateUrl: './event-consult.component.html',
  styleUrls: ['./event-consult.component.css']
})
export class EventConsultComponent implements OnInit, OnDestroy{

  souscriptionMere: Subscription = new Subscription();
  event$:Observable<EventModel> = new Observable<EventModel>;
  listUserFavoris$:Observable<UserModel[]> = new Observable<UserModel[]>;

  eventId:number = 0;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly eventServicePipe: EventService
  ){}
  

  ngOnInit(): void {
    this.eventId = +this.route.snapshot.paramMap.get('id')!;
    this.event$ = new Observable((observer:Observer<EventModel>)=>{
      this.eventServicePipe.getEventById(observer,this.eventId);
    });
    this.souscriptionMere.add(this.event$.subscribe());
    this.getListFavoris();
  }

  getListFavoris(){
    this.listUserFavoris$ = new Observable((observer:Observer<UserModel[]>)=>{
      this.eventServicePipe.getUserFavorites(observer,this.eventId);
    });
    this.souscriptionMere.add(this.listUserFavoris$.subscribe());
  }

  
  ngOnDestroy(): void {
    this.souscriptionMere.unsubscribe();
  }
}
