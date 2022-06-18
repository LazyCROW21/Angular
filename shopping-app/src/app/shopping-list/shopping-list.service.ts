import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    listChange = new Subject<Ingredient[]>();
    editItemId = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes', 10)
    ]

    getShoppingList() {
        return this.ingredients.slice();
    }

    getShoppingItem(id: number) {
        return this.ingredients[id];
    }

    addIngredient(newIngredient: Ingredient) {
        this.ingredients.push(newIngredient);
        this.listChange.next(this.ingredients);
    }

    addIngredients(newIngredients: Ingredient[]) {
        this.ingredients.push(...newIngredients);
        this.listChange.next(this.ingredients);
    }

    updateItem(id: number, newItem: Ingredient) {
        this.ingredients[id] = newItem;
        this.listChange.next(this.ingredients.slice());
    }

    deleteItem(id: number) {
        this.ingredients.splice(id, 1);
        this.listChange.next(this.ingredients.slice());
    }
}