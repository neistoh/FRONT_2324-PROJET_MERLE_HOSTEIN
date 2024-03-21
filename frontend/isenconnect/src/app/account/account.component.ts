import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';
import { UserModel } from '../model/user.model';
import { UserService } from '../user/user.service';
import { EventModel } from '../model/event.model';
import { EventService } from '../event/event.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy{
  
  souscriptionMere: Subscription = new Subscription();

  user$: Observable<UserModel> = new Observable<UserModel>;
  userEvent$: Observable<EventModel[]> = new Observable<EventModel[]>;
  favorites$: Observable<EventModel[]> = new Observable<EventModel[]>;

  constructor(
    private readonly userServicePipe: UserService,
    private readonly eventServicePipe: EventService
  ){}

  ngOnInit(): void {

    this.user$ = new Observable((observer: Observer<UserModel>)=>{
      this.userServicePipe.getUserData(observer);
    })
    this.userEvent$ = new Observable((observer: Observer<EventModel[]>)=>{
      this.eventServicePipe.getEventByUser(observer);
    })
    this.favorites$ = new Observable((observer: Observer<EventModel[]>)=>{
      this.eventServicePipe.getFavoritesByUser(observer);
    })

    this.souscriptionMere.add(this.user$.subscribe());
    this.souscriptionMere.add(this.userEvent$.subscribe());
    this.souscriptionMere.add(this.favorites$.subscribe());
  }

  ngOnDestroy(): void {
    this.souscriptionMere.unsubscribe()
  }
}
