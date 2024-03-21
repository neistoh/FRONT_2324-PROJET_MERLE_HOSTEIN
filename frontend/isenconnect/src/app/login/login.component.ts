import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginService } from './login.service';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {

  pseudo = new FormControl('');
  password = new FormControl('');
  nameForm = new FormControl('');
  firstnameForm = new FormControl('');
  mailForm = new FormControl('');
  birthdateForm = new FormControl('');
  avatarForm = new FormControl('');

  isRegistering = false;

  souscriptionMere: Subscription = new Subscription();

  constructor(
    private readonly loginServicePipe: LoginService,
    private readonly userServicePipe: UserService
  ){}

  ngOnInit(): void {
    this.loginServicePipe.connect('','','acceuil');
  }

  isUserAllowed(): void{
    console.log('On passe dans isUserAllowed');
    this.loginServicePipe.connect(this.pseudo.value,this.password.value,'acceuil');
  }

  register(){
    this.isRegistering = !this.isRegistering;
  }

  addUser(){
    const body = {
      name:this.nameForm.value,
      firstname:this.firstnameForm.value,
      nickname:this.pseudo.value,
      mail:this.mailForm.value,
      birthdate:this.birthdateForm.value,
      avatar:this.avatarForm.value,
      password:this.password.value
    }

    this.souscriptionMere.add(
      new Observable(()=>{
        this.userServicePipe.addUser(body);
      }).subscribe()
    )
  }

  ngOnDestroy(): void {
    this.souscriptionMere.unsubscribe();
  }

}
