import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output('onRecipeSelect')
  recipeSelect: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  recipes:Recipe[] = [
    new Recipe('Cake', 'Sweet Yummy', 'https://babecook.com/wp-content/uploads/2021/07/recipe-appetizing-hershey-chocolate-cake.jpg'),
    new Recipe('Noodles', 'Tasty Spicy', 'https://img-global.cpcdn.com/recipes/ed0156da09a3349f/400x400cq70/photo.jpg')
  ];

  onRecipeSelect(recipe: Recipe) {
    this.recipeSelect.emit(recipe);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
