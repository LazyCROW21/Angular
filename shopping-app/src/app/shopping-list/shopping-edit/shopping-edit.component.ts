import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  ingName: string;
  ingAmount: number;

  constructor(private shoppingListService: ShoppingListService) { }

  addToList() {
    this.shoppingListService.addIngredient(new Ingredient(this.ingName, this.ingAmount));
  }

  ngOnInit(): void {
  }

}
