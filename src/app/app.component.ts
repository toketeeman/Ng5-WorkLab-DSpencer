import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({                              // Initialize the Firebase SDK.
      apiKey: "AIzaSyAuiCVoMAK9mpWhFpmN6mGBoNPU3A5Gpmo",
      authDomain: "ng-recipe-book-30ed7.firebaseapp.com"
    });

  }

  onNavigate(feature: string) {
    console.log('Old Feature is ' + this.loadedFeature);
    console.log('New Feature is ' + feature);

    this.loadedFeature = feature;
  }
}
