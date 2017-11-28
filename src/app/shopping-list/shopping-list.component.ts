import { Component, OnInit 
  //,OnDestroy 
} from '@angular/core';
//import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Ingredient } from '../shared/ingredient.model';
//import { ShoppingListService } from './shopping-list.service';        // Old service way.
//import * as fromShoppingList from './store/shopping-list.reducers';   // Import just the shopping list state.
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';     // Import all the slices of our app state.

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit 
 //                                             , OnDestroy 
                                              {
  //ingredients : Ingredient[];

  shoppingListState: Observable<{ingredients: Ingredient[]}>;  // Object type must subtype the slice state type!
                                                               // The actual total state type here is State in
                                                               // shopping-list.reducers.ts.

  //private subscription: Subscription;

  constructor(
              //private slService: ShoppingListService, 
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');   // Select shopping list slice of our total NgRx 
                                                                  //  store which returns a built-in Observable. 
                                                                  //  See AppModule.

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
