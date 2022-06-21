import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as SLActions from '../store/shopping-list.actions'
import * as fromShoppingList from '../store/shopping-list.reducer';


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

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) { }

  onAddItem(form: NgForm) {
    const data = form.value;
    const ign = new Ingredient(data.ingName, data.ingAmount);
    if(this.editItem) {
      this.store.dispatch(new SLActions.UpdateIngredient())
    }
    else {
      this.store.dispatch(new SLActions.AddIngredient(ign))
    }
    this.editMode = false;
    this.slForm.reset();
  }

  onClear() {
    this.store.dispatch(new SLActions.StopEdit());
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete() {
    this.store.dispatch(new SLActions.DeleteIngredient());
    this.onClear();
  }

  ngOnInit(): void {
    this.editSub = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editItem = stateData.editedIngredient;
        this.slForm.setValue({
          ingName: this.editItem.name,
          ingAmount: this.editItem.amount,
        })
      } else {
        this.editMode = false;
      }
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new SLActions.StopEdit());
    this.editSub.unsubscribe();
  }
}
