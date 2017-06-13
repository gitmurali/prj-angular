import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number;
  editMode:boolean = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
      }
    )
  }

  private initForm() {
      let recipeName = '',
          recipeImage = '',
          recipeDesc = '',
          recipeIngredients = new FormArray([]);

      if(this.editMode) {
        const recipe = this.recipeService.getRecipe(this.id);
        recipeName = recipe.name;
        recipeImage = recipe.imagePath;
        recipeDesc = recipe.description;
        if(recipe.ingredients) {
          for (let ing of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ing.name, Validators.required),
                'amount': new FormControl(ing.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
            )
          }
        }

      }

      this.recipeForm = new FormGroup({
          'name': new FormControl(recipeName, Validators.required),
          'imagePath': new FormControl(recipeImage, Validators.required),
          'description': new FormControl(recipeDesc, Validators.required),
          'ingredients': recipeIngredients
      });

  }

  onsubmit() {
      // const newRecipe = new Recipe(
      //   this.recipeForm.value['name'],
      //   this.recipeForm.value['description'],
      //   this.recipeForm.value['imagePath'],
      //   this.recipeForm.value['ingredients']
      // );
      if(this.editMode) {
        this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      } else {
        this.recipeService.addRecipe(this.recipeForm.value);
      }
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }
}
