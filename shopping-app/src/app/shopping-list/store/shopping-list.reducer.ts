import { Ingredient } from "../../shared/ingredient.model";
import * as SLActions from './shopping-list.actions';

export interface State {
    editedIngredient: Ingredient,
    editedIngredientIndex: number,
    ingredients: Ingredient[]
}

const initialState: State = {
    editedIngredient: null,
    editedIngredientIndex: -1,
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ]
};

export function shoppingListReducer(
    state: State = initialState, 
    action: SLActions.ShoppingListActions
    ) {
    switch (action.type) {
        case SLActions.ADD_INGREDIENT:
            return { ...state, ingredients: [...state.ingredients, action.payload] };
        case SLActions.ADD_INGREDIENTS:
            return { ...state, ingredients: [...state.ingredients, ...<Ingredient[]>action.payload] };
        case SLActions.UPDATE_INGREDIENT:
            const updatedIngredient = {
                ...state.ingredients[state.editedIngredientIndex],
                ...action.payload
            };
            const updatedIngredients = [...state.ingredients ];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
            return { 
                ...state, 
                ingredients: updatedIngredients,
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        case SLActions.DELETE_INGREDIENT:
            return { 
                ...state, 
                ingredients: state.ingredients.filter((e, i) => i !== state.editedIngredientIndex),
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        case SLActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: { ...state.ingredients[action.payload] }
            };
        case SLActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        default:
            return state;
    }
}