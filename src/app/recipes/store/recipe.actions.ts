import { Action } from '@ngrx/store';

import { Recipe } from '../recipe.model';

export const SET_RECIPES = 'SET_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const STORE_RECIPES = 'STORE_RECIPES';
export const FETCH_RECIPES = 'FETCH_RECIPES';

export class SetRecipes implements Action {       // A reducer action.
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export class AddRecipe implements Action {         // A reducer action.
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {       // A reducer action.
  readonly type = UPDATE_RECIPE;

  constructor(public payload: {index: number, updatedRecipe: Recipe}) {}
}

export class DeleteRecipe implements Action {       // A reducer action.
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {}
}

export class StoreRecipes implements Action {      // An effects action. Stores into backend database.
  readonly type = STORE_RECIPES;

  // Don't need a payload (i.e. a non-default constructor) here because we can 
  //  access the recipes directly in our state in recipe.reducers.ts .
}

export class FetchRecipes implements Action {      // An effects action. Fetches from backend database.
  readonly type = FETCH_RECIPES;

  // Don't need a payload (i.e. a non-default constructor) here because we can 
  //  access the recipes directly in our state in recipe.reducers.ts .
}

export type RecipeActions = SetRecipes |
                            AddRecipe |
                            UpdateRecipe |
                            DeleteRecipe |
                            StoreRecipes |
                            FetchRecipes;
