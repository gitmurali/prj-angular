import {
  Component, OnDestroy,
  OnInit, ViewChild,
} from '@angular/core';

import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingEdit: NgForm;
  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingEdit.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  onSubmit(shoppingListForm: NgForm) {
    const val = shoppingListForm.value;
    const newIngredient = new Ingredient(val.name, val.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient.emit(newIngredient);
    }
    this.editMode = false;
    this.shoppingEdit.reset();
  }

  onClear() {
    this.shoppingEdit.reset();
    this.editMode = false;
  }

  onDelete() {
      this.shoppingListService.deleteIngredient(this.editItemIndex);
      this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
