export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;

    constructor(n: string, d: string, i: string) {
        this.name = n;
        this.description = d;
        this.imagePath = i;
    }
}