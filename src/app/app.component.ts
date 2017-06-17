import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  constructor() {}

  ngOnInit() {
      firebase.initializeApp({
        apiKey: "AIzaSyA8WpqHULkFwygY58tvSYYA5xQcU6BimX4",
        authDomain: "ng-angular-app.firebaseapp.com",
      });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
