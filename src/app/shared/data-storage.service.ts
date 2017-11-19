import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';  // New HttpClient for Angular 5.
import { Observable } from 'rxjs/Observable';       // Needed to use any Observable operators.
import 'rxjs/add/operator/map';                     // Do precise import of rxjs operation to satisy AoT.                
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient, 
              private recipeService: RecipeService,
              private authService: AuthService) {}

  storeRecipes() {
    const token = this.authService.getToken();  // Note: not used with active code shown.

    //const headers = new HttpHeaders().set('Authorization', 'Bearer fasrlakfhfdaaflkj');   // Typical JWT header.

    // Return observable to be (optionally) subscribed to by caller.
    // return this.httpClient.put('https://ng-recipe-book-30ed7.firebaseio.com/recipes.json',   
    //                            this.recipeService.getRecipes(), {
    //                              observe: 'body',
    //                              params: new HttpParams().set('auth', token)   // Helps shorten the URL.
    //                              //headers: headers     // Submitting headers example. See above.
    //                            }); 

    // Use this request format below instead to fully configure and to get progress events.
    // Here, we'll get upload and download progress events.

    // Without an interceptor.
    // const req = new HttpRequest(
    //                   'PUT', 
    //                   'https://ng-recipe-book-30ed7.firebaseio.com/recipes.json', 
    //                   this.recipeService.getRecipes(), 
    //                   {reportProgress: true, params: new HttpParams().set('auth', token)}); 
     
    // With an interceptor that adds the auth token (see auth.interceptor.ts).
    const req = new HttpRequest(
                      'PUT', 
                      'https://ng-recipe-book-30ed7.firebaseio.com/recipes.json', 
                      this.recipeService.getRecipes(),
                      {reportProgress: true});                 

    return this.httpClient.request(req);
  }

  getRecipes() {
    const token = this.authService.getToken();  // Note: not used with active code shown.

    // The http get is now generic!
    //this.httpClient.get<Recipe[]>('https://ng-recipe-book-30ed7.firebaseio.com/recipes.json?auth=' + token)

    // Without an interceptor.
    // this.httpClient.get<Recipe[]>('https://ng-recipe-book-30ed7.firebaseio.com/recipes.json?auth=' + token, {
    //   observe: 'body',   // Note: not really used here.
    //   responseType: 'json'
    // })

    // With an interceptor that adds the auth token (see auth.interceptor.ts).
    this.httpClient.get<Recipe[]>('https://ng-recipe-book-30ed7.firebaseio.com/recipes.json', {
      observe: 'body',   // Note: not really used here.
      responseType: 'json'
    })
      .map(
        (recipes) => {                         // New HttpClient automatically returns the response body!
          console.log(recipes);
          for (let recipe of recipes) {        // Insure rtnd body has array (ingredients) property.
            if (!recipe['ingredients']) {      // Database itself might exclude this property if array is empty!
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      // "Return" the results via using a data service. Don't return an observable.
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
