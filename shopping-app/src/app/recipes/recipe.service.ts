import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    
    private recipes: Recipe[] = [
        new Recipe(
            'Cake', 
            'Sweet Yummy', 
            'https://babecook.com/wp-content/uploads/2021/07/recipe-appetizing-hershey-chocolate-cake.jpg',
            [
                new Ingredient('Apple', 2),
                new Ingredient('Banana', 1)
            ]
        ),
        new Recipe(
            'Noodles', 
            'Tasty Spicy', 
            'https://img-global.cpcdn.com/recipes/ed0156da09a3349f/400x400cq70/photo.jpg',
            [
                new Ingredient('Wheat', 2),
                new Ingredient('Spice', 7)
            ]
        )
    ];

    getRecipe(id: number) {
        return this.recipes[id];
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addRecipe(newRecipe: Recipe) {
        this.recipes.push(newRecipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(id:number, updRecipe: Recipe) {
        this.recipes[id] = updRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(id: number) {
        this.recipes.splice(id, 1);
        this.recipesChanged.next(this.recipes);
    }
}