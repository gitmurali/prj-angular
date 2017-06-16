import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {RecipeService} from "../recipes/recipe.service";

@Injectable()
export class DataStorageService {
  constructor(private httpService: Http,
              private recipeService: RecipeService) {}

  storeRecipes() {
    return this.httpService.put('https://ng-recipe-app-30843.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }

  fetchRecipes() {
    return this.httpService.get('https://ng-recipe-app-30843.firebaseio.com/recipes.json');
  }
}
