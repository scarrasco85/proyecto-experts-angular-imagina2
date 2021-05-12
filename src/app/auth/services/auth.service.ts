import { Injectable } from '@angular/core';
import { Observable , of} from 'rxjs';
import { User } from '../models/user/user.model';
//Import httpClient to perform HTTP Request
import { HttpClient, HttpClientModule } from '@angular/common/http'

import { environment } from '../../../environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Boolean para decir al AuthGuard que el usuario esta logueado
  isLoggedIn: boolean = false

  //Injects HttpClient to the constructor of the service
  constructor(private http: HttpClient) { }


  /**
   * Login with real HTTP request
   * @param user User
   * @returns Observable<any>
   * Siempre los http devuelven observables
   */
  login(user: User): Observable<any>{

    //Segunda forma:
    let body = {
      email: user.email,
      password: user.password
    }
    console.log('body: ', body);
    return this.http.post(base_url + '/auth/login', body) //...user (envia los parametros por separado)
  }

   /**
   * Login with real HTTP request
   * @param user User
   * @returns Observable<any>
   * Siempre los http devuelven observables
   */
    register(user: User): Observable<any>{

      //Segunda forma:
      let body = {
        username: user.username,
        email: user.email,
        password: user.password
      }
      console.log('body: ', body);
      return this.http.post(base_url + '/auth/signup', body) //...user (envia los parametros por separado)
    }

  //Setter and Getter de LoggedIn
  get loggedIn() {
    return this.isLoggedIn;
  }

  setLoggedIn(value: boolean) {
    this.isLoggedIn = value
  }

}