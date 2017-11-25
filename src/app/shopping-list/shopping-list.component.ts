import { Component, OnInit, OnDestroy } from '@angular/core';
//import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Ingredient } from '../shared/ingredient.model';
//import { ShoppingListService } from './shopping-list.service';
import * as fromShoppingList from './store/shopping-list.reducers';
import * as ShoppingListActions from './store/shopping-list.actions';

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

  constructor(
              //private slService: ShoppingListService, 
              private store: Store<fromShoppingList.AppState>) { }

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
    // this.slService.startedEditing.next(index);    // Old service way.

    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();  // Remove this custom subscription to avoid memory leak.
  // }
}
