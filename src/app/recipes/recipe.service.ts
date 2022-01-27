import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipes.model";

@Injectable()
export class RecipeService{
  // recipeSelected=new EventEmitter<Recipe>();
  // recipeSelected=new Subject<Recipe>();
   recipeChanged=new Subject<Recipe[]>();
//  private recipes:Recipe[]=[
//     new Recipe('Gobi Manchurian',
//     'Chienese food',
//     '../../assets/Gobi Manchurian.jpg',
//     [
//       new Ingredient('Onion',2),
//       new Ingredient('Capsicum',4)
//     ]),
//     new Recipe('Gobi Manchurian Special'
//     ,'Chienese food',
//     '../../assets/Gobi Manchurian.jpg',
//     [
//       new Ingredient('Onion',4),
//       new Ingredient('Capsicum',8)
//     ])
//   ];

private recipes:Recipe[]=[];
  constructor(private slservice:ShoppingListService){}

  setRecipes(recipes:Recipe[])
  {
    this.recipes=recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
  getRecipes()
  {
    return this.recipes.slice();
  }

  getRecipe(index:number)
  {
    return this.recipes[index];
  }

  addToShpList(ing:Ingredient[])
  {
    this.slservice.addIngredients(ing);
  }

  addRecipe(recipe:Recipe)
  {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index:number,newRecipe:Recipe)
  {
    this.recipes[index]=newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number)
  {
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }

}

