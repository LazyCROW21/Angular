import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

export class RecipeService {
    
    private recipe: Recipe[] = [
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
        return this.recipe[id];
    }

    getRecipes() {
        return this.recipe.slice();
    }
}