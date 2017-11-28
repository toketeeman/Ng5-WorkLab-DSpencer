import { 
  Component, 
  OnInit, 
  OnDestroy,
  ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
//import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
//import * as fromShoppingList from '../store/shopping-list.reducers';
import * as fromApp from '../../store/app.reducers';  // Import all the slices of our app state.

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  //editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
              //private slService: ShoppingListService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList')   // Select a state slice of our NgRx store which
                                                            //  returns a built-in Observable. See AppModule.
      .subscribe(
        state => {
          if (state.editedIngredientIndex > -1) {
            this.editedItem = state.editedIngredient;
            this.editMode = true;
            this.slForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            });
          } else {
            this.editMode = false;
          }
        }
      );

    // this.subscription = this.slService.startedEditing      // Old service way.
    //                       .subscribe(
    //                         (index: number) => {
    //                           this.editedItemIndex = index;
    //                           this.editMode = true;
    //                           this.editedItem = this.slService.getIngredient(index);
    //                           this.slForm.setValue({
    //                             name: this.editedItem.name,
    //                             amount: this.editedItem.amount
    //                           });
    //                         }
    //                       );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    // Old service way.
    // if (this.editMode) {                                              
    //   this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    // } else {
    //   this.slService.addIngredient(newIngredient);
    // }

    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: newIngredient}));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex);  // Old service way.
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());   // Reset state when leaving edit component!
    this.subscription.unsubscribe();  // Remove this custom subscription to avoid memory leak.
  }
}
