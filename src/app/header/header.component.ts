import {Component} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {Response} from "@angular/http";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import 'rxjs/Rx';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dataStoreService: DataStorageService,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  onSaveData() {
    this.dataStoreService.storeRecipes().subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }

  onFetchData() {
    this.dataStoreService.fetchRecipes()
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }

  onLogout() {
    this.authService.logout();
  }
}
