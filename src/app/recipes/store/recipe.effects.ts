import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import 'rxjs/add/operator/switchMap';     // Do precise import of rxjs operation to satisy AoT.
import { HttpClient } from "@angular/common/http";

import * as RecipeActions from '../store/recipe.actions';
import { Recipe } from "../recipe.model";

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap((action: RecipeActions.FetchRecipes) => {
      // Http done with an interceptor that adds the auth token (see auth.interceptor.ts).
      return this.httpClient.get<Recipe[]>('https://ng-recipe-book-30ed7.firebaseio.com/recipes.json', {
          observe: 'body',   // Note: not really used here.
          responseType: 'json'
        });
      })
    .map(
      (recipes) => {                         // New HttpClient automatically returns the response body!
        console.log(recipes);
        for (let recipe of recipes) {        // Insure returned body has array (ingredients) property.
          if (!recipe['ingredients']) {      // Database itself might exclude this property if array is empty!
            recipe['ingredients'] = [];
          }
        }

        //return recipes;           // Formerly meant to be fed to the commented-out service farther below.

        // Create single reducer action (observable) to be auto-dispatched by NgRx/effects to put 
        //  recipes into the store. Note: if creating multiple reducer actions, must use mergeMap instead!
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
      }
    );
      
    // .subscribe(                                    // Old service way without NgRx.
    //   (recipes: Recipe[]) => {
    //     this.recipeService.setRecipes(recipes);
    //   }
    // );

  constructor(private actions$: Actions,
              private httpClient: HttpClient) {}
}
