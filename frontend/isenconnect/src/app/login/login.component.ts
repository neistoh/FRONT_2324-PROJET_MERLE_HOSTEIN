import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedConstantes } from 'src/shared/shared-constantes.constantes';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  pseudo = new FormControl('');
  password = new FormControl('');

  constructor(
    private readonly loginServicePipe: LoginService
  ){}

  ngOnInit(): void {
    this.loginServicePipe.connect('','','acceuil');
  }

  isUserAllowed(): void{
    console.log('On passe dans isUserAllowed');
    this.loginServicePipe.connect(this.pseudo.value,this.password.value,'acceuil');
  }

}
