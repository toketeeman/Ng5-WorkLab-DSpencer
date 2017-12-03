import { ActionReducerMap } from "@ngrx/store";

import * as fromShoppingList from "../shopping-list/store/shopping-list.reducers";
import * as fromAuth from '../auth/store/auth.reducers';

// Note: selecting a slice always returns an observable.

export interface AppState {               // Our app's state slices. Keywords are used as select arguments.
  shoppingList: fromShoppingList.State,     
  auth: fromAuth.State
}

// Note: all reducers executed as dispatched action execute synchronously.

export const reducers: ActionReducerMap<AppState> = {     // Our app's state reducers
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
}
