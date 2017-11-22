import { Component, OnInit, OnDestroy } from '@angular/core';
//import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit 
 //                                             , OnDestroy 
                                              {
  //ingredients : Ingredient[];

  shoppingListState: Observable<{ingredients: Ingredient[]}>;
  //private subscription: Subscription;

  constructor(private slService: ShoppingListService, 
              private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');   // Select a slice of our NgRx store which
                                                                  //  returns an Observable.

    // this.ingredients = this.slService.getIngredients();        // Old service approach for managing state.
    // this.subscription = this.slService.ingredientsChanged
    //                       .subscribe(
    //                         (ingredients: Ingredient[]) => {
    //                           this.ingredients = ingredients;
    //                         }
    //                       );
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();  // Remove this custom subscription to avoid memory leak.
  // }
}
