import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();  // Observable used to propagate the actual state.

  private recipes: Recipe[]= [   // The actual recipe state.
    new Recipe(
      'A Test Recipe', 
      'Really tasty shit!', 
      'https://cdn.pixabay.com/photo/2017/09/06/20/03/shrimp-2722795_640.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      'Another Test Recipe', 
      'Easy to cook!', 
      'https://cdn.pixabay.com/photo/2017/09/06/20/03/shrimp-2722795_640.jpg',
      [ 
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();  //  Beware! A shallow copy, not the actual state.  
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);   // Actual change made here.
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;    // Actual change made here.
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);    // Actual change made here.
    this.recipesChanged.next(this.recipes.slice());
  }

}
