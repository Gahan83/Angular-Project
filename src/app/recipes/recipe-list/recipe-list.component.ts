import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
//  @Output() recipeWasSelected=new EventEmitter<Recipe>();
recipes:Recipe[];
subscription:Subscription;
  constructor( private recipeService:RecipeService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
   this.subscription= this.recipeService.recipeChanged.subscribe((recipes:Recipe[])=>{
      this.recipes=recipes;
    });
   this.recipes=this.recipeService.getRecipes();
  }
  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }
  // onRecipeSelected(recipe:Recipe)
  // {
  //   this.recipeWasSelected.emit(recipe);
  // }


}
