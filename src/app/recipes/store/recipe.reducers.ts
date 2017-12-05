import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import * as RecipeActions from "./recipe.actions";
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {  // Our features's state slices appended to 
                                                          //  the app's state slices (here, only one is appended).
  recipes: State
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes : [                     // The initial local recipe state.
    new Recipe(
      'A Test Recipe', 
      'Really tasty bits!', 
      'https://assets.vogue.com/photos/589188af7edfa70512d6514a/master/pass/10-macedonia-food-guide.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      'Another Test Recipe', 
      'Easy to cook!', 
      'https://www.thelocal.it/userdata/images/article/69523836b0191608c41d640feead8da2be5462038d3409e1e3900fad039c7fc8.jpg',
      [ 
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]     // Do not use recipes: payload ! State change must be immutable.
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipeActions.UPDATE_RECIPE:
      const oldRecipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...oldRecipe,
        ...action.payload.updatedRecipe
      };
      const updatingRecipes = [...state.recipes];
      updatingRecipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: updatingRecipes
      };
    case RecipeActions.DELETE_RECIPE:
      const deletingRecipes = [...state.recipes];
      deletingRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: deletingRecipes
      };
    default:
      return state;
  }
}