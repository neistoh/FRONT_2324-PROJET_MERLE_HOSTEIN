import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { SharedConstantes } from 'src/shared/shared-constantes.constantes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  pseudo = new FormControl('');
  password = new FormControl('');

  ngOnInit(): void {
  }

  isUserAllowed(): void{
    console.log(this.pseudo.value);
    console.log(this.password.value);
    fetch(SharedConstantes.ADDRESS_LOCAL_HOST+':'+SharedConstantes.PORT+'/user', {
      method: 'POST',
      headers: {
          "Content-type": "application/json"
      },
      body: JSON.stringify({
        pseudo: this.pseudo.value,
        password: this.password.value 
      })
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if(data["droits"] === "W"){
        console.log("A le droits de ce connecter");
      }
    })
    .catch(function(error) {
      console.log('Request failed', error);
    });
  }

}
