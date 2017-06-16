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
        apiKey: "AIzaSyATMfISJ317a1BNzW73N_3OyvkFoRIsUU0",
        authDomain: "ng-recipe-app-30843.firebaseapp.com",
      });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
