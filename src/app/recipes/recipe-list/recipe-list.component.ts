import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

//import { Recipe } from '../recipe.model';
//import { RecipeService }  from '../recipe.service';
import * as fromRecipe from '../store/recipe.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit 
                                            //,OnDestroy 
                                            {
  recipeState: Observable<fromRecipe.State>;

  // recipes: Recipe[];    // The local component's COPY of the actual recipes. 
  //                           // Actual copy resides in the recipe service.
  //subscription: Subscription;

  constructor(
              //private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromRecipe.FeatureState>) { 
  }

  ngOnInit() {
    this.recipeState = this.store.select('recipes');      // Using the slice name. Returns an observable.

    // Made unnecessary by using NgRx store.
    
    // this.subscription = this.recipeService.recipesChanged
    //                       .subscribe(
    //                         (recipes: Recipe[]) => {
    //                           this.recipes = recipes;
    //                         }
    //                       )

    // this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();   // Remove this custom subscription to avoid memory leak.
  // }
}
