import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    url: string = 'https://shopping-app-1cc81-default-rtdb.asia-southeast1.firebasedatabase.app/';

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    saveRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put(this.url + '/recipes.json', recipes).subscribe(response => console.log(response));
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(this.url + '/recipes.json')
        .pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return { ingredients: [], ...recipe };
                })
            }),
            tap(recipes => {
                this.recipeService.setRecipe(recipes);
            })
        );
    }
}