import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

//import { AuthService } from '../auth.service';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    // Replaced by NgRx/effects implementation.
    // this.authService.signupUser(email, password);   // Note: Firebase password must be at least 6 characters,
    //                                                 //  but not explicitly validated here.
    
    this.store.dispatch(new AuthActions.TrySignup({username: email, password: password}));
  }

}
