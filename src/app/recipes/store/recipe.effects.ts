import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import 'rxjs/add/operator/switchMap';

import * as RecipeActions from '../store/recipe.actions';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap((action: RecipeActions.FetchRecipes) => {
      
    });

  constructor(private actions$: Actions) {}
}
