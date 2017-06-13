import {Ingredient} from "../shared/ingredient.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

// @Injectable (only use injectable when you want to include other service in this service)
export class ShoppingListService {

  ingredientsChagned = new Subject<Ingredient[]>();
  addIngredient = new EventEmitter<Ingredient>();
  startedEditing = new Subject<number>();

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

  getIngredient(index: number) {
    return this.ingredients.slice()[index];
  }

  updateIngredient(index: number, ing: Ingredient) {
    this.ingredients[index] = ing;
    this.ingredientsChagned.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
      this.ingredients.splice(index, 1);
      this.ingredientsChagned.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
      // for(let ingredient of ingredients) {
      //   this.ingredients.push(ingredient);
      // }
        this.ingredients.push(...ingredients); // using es6 spread operator..
  }
}
