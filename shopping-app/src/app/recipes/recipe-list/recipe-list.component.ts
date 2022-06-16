import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes:Recipe[] = [
    new Recipe('Cake', 'Sweet Yummy', 'https://babecook.com/wp-content/uploads/2021/07/recipe-appetizing-hershey-chocolate-cake.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
