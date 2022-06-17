import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    constructor(n: string, d: string, i: string, ig: Ingredient[]) {
        this.name = n;
        this.description = d;
        this.imagePath = i;
        this.ingredients = ig;
    }
}