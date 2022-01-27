import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients:Ingredient[];
  private igChangeSub:Subscription;
  constructor(private slservice:ShoppingListService) { }

  ngOnInit(){
    this.ingredients=this.slservice.getIngredients();
    this.igChangeSub=this.slservice.ingredientsChanged.subscribe((ingredients:Ingredient[])=>{
      this.ingredients=ingredients;
    })
  }

  ngOnDestroy()
  {
    this.igChangeSub.unsubscribe();
  }

  onEditItem(index:number){
    this.slservice.startedEditing.next(index);
  }

  // onIngredientAdded(ingredient:Ingredient)
  // {
  //   this.ingredients.push(ingredient);
  // }
}
