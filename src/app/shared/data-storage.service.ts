import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {RecipeService} from "../recipes/recipe.service";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class DataStorageService {
  constructor(private httpService: Http,
              private recipeService: RecipeService,
              private authService: AuthService) {}

  storeRecipes() {
    const token = this.authService.getToken();
    return this.httpService.put('https://ng-recipe-app-30843.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
  }

  fetchRecipes() {
    const token = this.authService.getToken();
    return this.httpService.get('https://ng-recipe-app-30843.firebaseio.com/recipes.json?auth=' + token);
  }


}
