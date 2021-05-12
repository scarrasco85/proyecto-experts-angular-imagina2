import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user/user.model';

import { AuthService } from '../../services/auth.service';

// Redux
import { StoreService } from 'src/app/services/store/store.service';
import { ACTION_CHANGE_IS_LOGGED_IN } from 'src/app/store/actions/actions.types';
import SessionState from 'src/app/store/config/session/sessionState.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  user: User = new User('','', '')

  isLoggedIn: boolean = false;

  isLoginError: boolean = false
  
  loginForm: FormGroup = new FormGroup({}) 


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email:    ['usuarioprueba@example.com', [ Validators.required, Validators.email ]],
      password: ['imagina', [ Validators.required, Validators.minLength(6) ]],
    });

  }


  login(): void{

    console.log('Ehtroo');
   // const { email, password } = this.loginForm.value;
    this.user.email =  this.loginForm.value.email;
    this.user.password = this.loginForm.value.password;
    console.log('email',this.loginForm.value.email);

    this.authService.login(this.user).subscribe((response) => {

      //Obtaint the token
      console.log('Token: ', response.token)
      sessionStorage.setItem('Token', response.token); 

      

      this.authService.setLoggedIn(true);
     
      this.router.navigate(['/experts']);

       // Update title in HeaderState
       this.storeService.updateState({
        type: ACTION_CHANGE_IS_LOGGED_IN,
        payload: true
      });

    },
    (error)=> {
        
     this.isLoginError = true;

    });

 
  }

}
