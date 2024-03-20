import {Component, OnDestroy, OnInit } from '@angular/core';
import { UserModel } from '../model/user.model';
import { EventService } from '../event/event.service';
import { Observable, Observer, Subscription, tap } from 'rxjs';
import { EventModel } from '../model/event.model';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit, OnDestroy {
  user: UserModel = new UserModel('','','','',new Date(),'');

  souscriptionMere: Subscription = new Subscription();
  event$: Observable<EventModel[]> = new Observable<EventModel[]>;


  nameForm = new FormControl('');
  optionThemeForm = new FormControl('');
  prixForm = new FormControl('');
  greaterLesserForm = new FormControl('');

  triDateForm = new FormControl('');
  triPrixForm = new FormControl('');

  greaterLesserOption = 'Inférieur à'


  constructor(
    private readonly eventServicePipe: EventService,
    private readonly router: Router
  ){
    this.user.nickname = sessionStorage.getItem('nickname')!;
  }
  

  ngOnInit(): void {
    const filtre = {}
    this.event$ = new Observable((observer:Observer<EventModel[]>)=>{
      this.eventServicePipe.getEventByFiltre(observer,filtre);
    });
    
    this.souscriptionMere.add(this.greaterLesserForm.valueChanges.pipe(tap(value=>{
      value?this.greaterLesserOption='Supérieur à':this.greaterLesserOption='Inférieur à';
    })).subscribe());
    

    this.souscriptionMere.add(this.triDateForm.valueChanges.pipe(tap(value=>{
      let ordre = this.triDateForm.value?1:-1;
      this.filtreWithTri("date", ordre.toString());
    })).subscribe());

    this.souscriptionMere.add(this.triPrixForm.valueChanges.pipe(tap(value=>{
      let ordre = this.triPrixForm.value?1:-1;
      this.filtreWithTri("prix", ordre.toString());
    })).subscribe());
  }


  filtre(){
    let price = 0;
    if(this.greaterLesserForm.value && this.prixForm.value){
      price = +this.prixForm.value;
    }else if(this.prixForm.value){
      price = -this.prixForm.value;
    }
    console.log(this.greaterLesserForm.value);
    console.log(price);
    const filtre = {
      name: this.nameForm.value,
      theme: this.optionThemeForm.value,
      price: price
    }
    this.event$ = new Observable((observer:Observer<EventModel[]>)=>{
      this.eventServicePipe.getEventByFiltre(observer,filtre);
    })
  }

  filtreWithTri(tri: string,ordre: string){
    let price = 0;
    if(this.greaterLesserForm.value && this.prixForm.value){
      price = +this.prixForm.value;
    }else if(this.prixForm.value){
      price = -this.prixForm.value;
    }
    const filtre = {
      name: this.nameForm.value,
      theme: this.optionThemeForm.value,
      price: price,
      tri: tri,
      ordre: ordre
    }
    this.event$ = new Observable((observer:Observer<EventModel[]>)=>{
      this.eventServicePipe.getEventByFiltre(observer,filtre);
    })
  }

  resetFiltre(){
    const filtre = {
      theme: '',
      price: 0,
      date: ''
    }
    this.event$ = new Observable((observer:Observer<EventModel[]>)=>{
      this.eventServicePipe.getEventByFiltre(observer,filtre);
    })

    this.optionThemeForm.setValue('');
    this.nameForm.setValue('');
    this.prixForm.setValue('0');
    this.greaterLesserForm.setValue('');
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


  checkDetailEvent(id:number){
    this.router.navigateByUrl('eventConsult/'+id);
  }

  ngOnDestroy(): void {
    this.souscriptionMere.unsubscribe();
  }
}
