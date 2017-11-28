import { ActionReducerMap } from "@ngrx/store";

import * as fromShoppingList from "../shopping-list/store/shopping-list.reducers";
import * as fromAuth from '../auth/store/auth.reducers';

export interface AppState {               // Our app's state slices.
  shoppingList: fromShoppingList.State,     
  auth: fromAuth.State
}

export const reducers: ActionReducerMap<AppState> = {     // Our app's state reducers
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
}
