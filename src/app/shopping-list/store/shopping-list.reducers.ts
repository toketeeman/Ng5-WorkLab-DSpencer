import * as ShoppingListActions from './shopping-list.actions';

import { Ingredient } from "../../shared/ingredient.model";

export interface State {
  ingredients: Ingredient[],
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

// All dispatched actions update the state immutably and synchronously!
// Ergo, reducers cannot do asynchronous actions.

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT: 
      return {
        ...state,                                             // Regenerate the current state before action.
        ingredients: [...state.ingredients, action.payload]   // Action done here: override the state's 
      };                                                       //  ingredients property.
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = { ...ingredient, ...action.payload.ingredient};
      const ingredientsForUpdate = [...state.ingredients];  // Copy original ingredient array. (Immutability)
      ingredientsForUpdate[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: ingredientsForUpdate,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      const ingredientsForDelete = [...state.ingredients];  // Copy original ingredient array. (Immutability)
      ingredientsForDelete.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: ingredientsForDelete,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.START_EDIT:
      const editedIngredient = {...state.ingredients[action.payload]};  // Copy orig ingredient. (Immutability)
      return {
        ...state,
        editedIngredient: editedIngredient,
        editedIngredientIndex: action.payload
      };
    case ShoppingListActions.STOP_EDIT:    // Important to explicitly reset state when leaving a form component!
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
    };
    default:
      return state;
  }
}
