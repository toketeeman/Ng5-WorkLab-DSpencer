import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) {} 

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)   // Promise returned here.
      .catch(
        error => console.log(error)
      )
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)       // Promise returned here.
      .then(
        response => {
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()    // Returns a promise. Async because verification of "token is active"
            .then(                                  // requires a firebase access.
              (token: string) => this.token = token
            )
        }
      )
      .catch(
        error => console.log(error)
      )
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()   // Returns a promise. Async because verification of "token is active" 
      .then(                                 // requires a firebase access.
        (token: string) => this.token = token
      );
    return this.token;                      // MOST of the time, this token will be current/active! Otherwise, set up a retry.                                                 // Done this way as a convenience for accessing this function since it is called
                                            // only for actual database operations AFTER a login that iniitally sets the token.
  }

  isAuthenticated() {
    return this.token != null;
  }
}