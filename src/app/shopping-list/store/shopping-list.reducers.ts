import * as ShoppingListActions from './shopping-list.actions';

import { Ingredient } from "../../shared/ingredient.model";

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT: 
      return {
        ...state,                                             // Reproduce the current state before action.
        ingredients: [...state.ingredients, action.payload]   // Action done here: override the state's 
                                                              // ingredients property.
      }
    default:
      return state;
  }
}
