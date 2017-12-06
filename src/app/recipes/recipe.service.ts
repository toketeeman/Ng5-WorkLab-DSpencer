//import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
//import { Store } from '@ngrx/store';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
//import { ShoppingListService } from '../shopping-list/shopping-list.service';
//import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';


//@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();  // Observable used to propagate the actual state.

  private recipes: Recipe[]= [   // The initial local recipe state.
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
  ];

  // constructor(
  //   //        private slService: ShoppingListService,
  //             private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();  //  Beware! A shallow copy, not the actual state.  
  }

  // // Not actually called anymore. So it is removed along with constructor above.
  // addIngredientsToShoppingList(ingredients: Ingredient[]) {
  //     //this.slService.addIngredients(ingredients);    // Using old service way.
  //     this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  // }


  // Made unnecessary by using the NgRx store.
  //
  // getRecipe(index: number) {
  //   return this.recipes[index];
  // }

  // addRecipe(recipe: Recipe) {
  //   this.recipes.push(recipe);   // Actual change made here.
  //   this.recipesChanged.next(this.recipes.slice());
  // }

  // updateRecipe(index: number, newRecipe: Recipe) {
  //   this.recipes[index] = newRecipe;    // Actual change made here.
  //   this.recipesChanged.next(this.recipes.slice());
  // }

  // deleteRecipe(index: number) {
  //   this.recipes.splice(index, 1);    // Actual change made here.
  //   this.recipesChanged.next(this.recipes.slice());
  // }
}
