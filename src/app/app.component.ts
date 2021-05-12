import { Component } from '@angular/core';

// Redux
import { StoreService } from 'src/app/services/store/store.service';
import { ACTION_CHANGE_IS_LOGGED_IN } from 'src/app/store/actions/actions.types';
import SessionState from 'src/app/store/config/session/sessionState.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'experts-frontend';
  isLoggedIn: boolean = false;

  constructor(
    private storeService: StoreService
  ) { }


  ngOnInit(): void {

    // Load State
    this.storeService.getState('sessionStore').subscribe((state: HeaderState) => {

      this.isLoggedIn = state.isLoggedIn;
    });

  }
        
}
