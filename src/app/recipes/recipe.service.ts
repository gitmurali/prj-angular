import {Recipe} from './recipe.model';
import {Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs/Subject";

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
          'Salmon, Tuna and Loach Sushi Rolls',
          'Rinse the salmon, pat dry and cut into 5 mm ',
          'https://images.eatsmarter.com/sites/default/files/styles/920x517/public/salmon-tuna-and-loach-sushi-rolls-561794.jpg',
          [
            new Ingredient("Salmon", 60),
            new Ingredient("tuna loin", 60),
            new Ingredient("wolf fish fillet", 80)
          ]
        ),
        new Recipe(
          'Salad with Egg, Tomato and Fish',
          'Hard-boil the eggs in water for 8-10 minutes.',
          'https://images.eatsmarter.com/sites/default/files/styles/920x517/public/salad-with-egg-tomato-and-fish-572530.jpg',
          [
            new Ingredient("cherry tomato", 200),
            new Ingredient("canned tuna", 100),
            new Ingredient("lemon juice", 3)
          ]
        )
    ];

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice(); //get only copy of recipes not original recipes array..
    }

    getRecipe(id: number) {
      return this.recipes.slice()[id];
    }

    addRecipe(recipe: Recipe) {
          this.recipes.push(recipe);
          this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
          this.slService.addIngredients(ingredients);
    }

    deleteIngredients() {

    }
}
