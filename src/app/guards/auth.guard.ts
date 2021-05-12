import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

// Redux
import { StoreService } from 'src/app/services/store/store.service';
import { ACTION_CHANGE_IS_LOGGED_IN } from 'src/app/store/actions/actions.types';
import SessionState from 'src/app/store/config/session/sessionState.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLoggedIn: boolean = false;
 

  //Pueden ser inyectados en todo el proyecto

  constructor(private authService: AuthService, private router: Router, private _storeService: StoreService){}

  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // Load State
    this._storeService.getState('sessionState').subscribe((state: SessionState) => {
      this.isLoggedIn = state.isLoggedIn;
      console.log('this.isLoggedIn: ', this.isLoggedIn);
      console.log('state.isLoggedIn: ', state.isLoggedIn);
      
    });
    //Si el usuario esta logeado
    //El servicio nos da el valor booelan logedin y tambien el sessiondstorage
    
    if (this.isLoggedIn && sessionStorage.getItem('Token')) {
      console.log('Token en Storage: ', sessionStorage.getItem('Token'));
      return true;
    } else {
      
      this.router.navigate(['auth/login']);
      return false;
   }

  }

}
