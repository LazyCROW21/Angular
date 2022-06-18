import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', { static: true })
  slForm: NgForm;

  editSub: Subscription;
  editMode: boolean = false;
  editItemId: number;
  editItem: Ingredient;
  ingName: string;
  ingAmount: number;

  constructor(private shoppingListService: ShoppingListService) { }

  onAddItem(form: NgForm) {
    const data = form.value;
    const ign = new Ingredient(data.ingName, data.ingAmount);
    if(this.editItem) {
      this.shoppingListService.updateItem(this.editItemId, ign);
    }
    else {
      this.shoppingListService.addIngredient(ign);
    }
    this.editMode = false;
    this.slForm.reset();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete() {
    this.shoppingListService.deleteItem(this.editItemId);
    this.onClear();
  }

  ngOnInit(): void {
    this.editSub = this.shoppingListService.editItemId.subscribe((id: number) => {
      this.editMode = true;
      this.editItemId = id;
      this.editItem = this.shoppingListService.getShoppingItem(id);
      this.slForm.setValue({
        ingName: this.editItem.name,
        ingAmount: this.editItem.amount,
      })
    })
  }

  ngOnDestroy() {
    this.editSub.unsubscribe();
  }
}
