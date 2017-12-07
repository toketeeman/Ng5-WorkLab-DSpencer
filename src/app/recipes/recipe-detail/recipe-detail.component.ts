import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';                    // Do precise import of rxjs operation to satisy AoT.

//import { Recipe } from '../recipe.model';
//import { RecipeService } from '../recipe.service';
//import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
//import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducers'; 
//import * as fromApp from '../../store/app.reducers';      // Import all the slices of our app state.
import * as fromRecipe from '../store/recipe.reducers';   // Import all slices of app state AND recipe state.
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  id: number;

  constructor(
              //private recipeService: RecipeService,         // Old service way.
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
      this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          //this.recipe = this.recipeService.getRecipe(this.id);
          this.recipeState = this.store.select('recipes');        // Get observable of the recipes slice.
        }
      );

  }

  onAddToShoppingList() {
    //this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);  // Old service way.

    this.store.select('recipes')
      .take(1)
      .subscribe((recipeState: fromRecipe.State) => {
        this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.id].ingredients));
      });
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});   // Best most efficient routing, not needing the id at all.
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});   // Roundabout way in case id is available.
  }

  onDeleteRecipe() {
    //this.recipeService.deleteRecipe(this.id);    // Old service way.

    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }

}
