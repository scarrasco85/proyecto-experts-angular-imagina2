import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user/user.model';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User = new User('','', '')

  isRegisterError: boolean = false
  
  registerForm: FormGroup = new FormGroup({}) 

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      username: ['userPrueba', [ Validators.required ]],
      email:    ['prueba@example.com', [ Validators.required, Validators.email ]],
      password: ['prueba', [ Validators.required, Validators.minLength(6) ]],
    });
  }


  register(): void{

    console.log('Ehtroo');
   // const { email, password } = this.loginForm.value;
   this.user.username =  this.registerForm.value.username;
    this.user.email =  this.registerForm.value.email;
    this.user.password = this.registerForm.value.password;
    //console.log('email',this.loginForm.value.email);
    console.log('Usuario: ', this.user);

    this.authService.register(this.user).subscribe((response) => {

     
     
      this.router.navigate(['/auth/login']);

    },
    (error)=> {
        
     this.isRegisterError = true;
             
    });

 
  }

}
