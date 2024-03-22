import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Observer, Subscription } from 'rxjs';
import { EventModel } from '../model/event.model';
import { EventService } from '../event/event.service';
import { UserModel } from '../model/user.model';
import { FormControl } from '@angular/forms';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-event-consult',
  templateUrl: './event-consult.component.html',
  styleUrls: ['./event-consult.component.css']
})
export class EventConsultComponent implements OnInit, OnDestroy{

  souscriptionMere: Subscription = new Subscription();
  event$:Observable<EventModel> = new Observable<EventModel>;
  listUserFavoris$:Observable<UserModel[]> = new Observable<UserModel[]>;

  isOwner$:Observable<boolean> = new Observable<boolean>;

  eventId:number = 0;

  //Formulaire d'édition d'un évenement
  saveIcone = 'edit';
  nameForm = new FormControl('');
  priceForm = new FormControl('');
  optionThemeForm = new FormControl('');
  dateForm = new FormControl('');

  isInModification = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly eventServicePipe: EventService,
    private readonly userServicePipe: UserService
  ){}
  

  ngOnInit(): void {
    //Récupération de l'évenement, de l'utilisateur est le owner et de la liste des favoris de l'évenement
    this.eventId = +this.route.snapshot.paramMap.get('id')!;
    this.event$ = new Observable((observer:Observer<EventModel>)=>{
      this.eventServicePipe.getEventById(observer,this.eventId);
    });
    this.souscriptionMere.add(this.event$.subscribe());

    this.isOwner$ = new Observable((observer:Observer<boolean>)=>{
      this.eventServicePipe.getEventOwner(observer,this.eventId);
    });
    this.souscriptionMere.add(this.isOwner$.subscribe());

    this.getListFavoris();
  }

  //Récupére la liste des utilisateur ayant l'event en favoris
  getListFavoris(){
    this.listUserFavoris$ = new Observable((observer:Observer<UserModel[]>)=>{
      this.eventServicePipe.getUserFavorites(observer,this.eventId);
    });
    this.souscriptionMere.add(this.listUserFavoris$.subscribe());
  }

  //Passe en mode modification d'event
  modification(){
    this.isInModification = !this.isInModification;
    if(!this.isInModification){
      this.updateEvent();
    }
    this.isInModification?this.saveIcone='save':this.saveIcone='edit';
  }

  //Modifi l'event
  updateEvent(){
    let body = {
      name: '',
      price: '',
      theme: '',
      date: ''
    }
    this.nameForm.value?body.name=this.nameForm.value:'';
    this.priceForm.value?body.price=this.priceForm.value:'';
    this.optionThemeForm.value?body.theme=this.optionThemeForm.value:'';
    this.dateForm.value?body.date=this.dateForm.value:'';
    console.log(body);
    this.event$ = new Observable((observer:Observer<EventModel>)=>{
      this.eventServicePipe.updateEvent(observer,this.eventId.toString(), body);
    });
    this.souscriptionMere.add(this.event$.subscribe());
  }

  //Ajoute l'event au favoris
  addToFavorites(){
    this.souscriptionMere.add(new Observable(()=>{
      this.userServicePipe.addEventToFavorites(this.eventId.toString());
    }).subscribe());

    this.getListFavoris();
  }
  
  ngOnDestroy(): void {
    this.souscriptionMere.unsubscribe();
  }
}
