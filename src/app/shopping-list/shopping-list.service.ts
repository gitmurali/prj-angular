import {Ingredient} from "../shared/ingredient.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

// @Injectable (only use injectable when you want to include other service in this service)
export class ShoppingListService {

  ingredientsChagned = new Subject<Ingredient[]>();
  addIngredient = new EventEmitter<Ingredient>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  constructor() {
    this.addIngredient.subscribe(
      (ingredient: Ingredient) => {
        this.ingredients.push(ingredient);
        this.ingredientsChagned.next(this.ingredients.slice());
      }
    );
  }

  addIngredients(ingredients: Ingredient[]) {
      // for(let ingredient of ingredients) {
      //   this.ingredients.push(ingredient);
      // }
        this.ingredients.push(...ingredients); // using es6 spread operator..
  }
}
