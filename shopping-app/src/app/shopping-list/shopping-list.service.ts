import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    listChange = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes', 10)
    ]

    getShoppingList() {
        return this.ingredients.slice();
    }

    addIngredient(newIngredient: Ingredient) {
        this.ingredients.push(newIngredient);
        this.listChange.next(this.ingredients);
    }

    addIngredients(newIngredients: Ingredient[]) {
        this.ingredients.push(...newIngredients);
        this.listChange.next(this.ingredients);
    }
}