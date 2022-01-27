import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') slForm:NgForm;
  subscription:Subscription;
  editMode=false;
  editItemIndex:number;
  editItem:Ingredient
  // @ViewChild('nameInput') nameInputRef:ElementRef;
  // @ViewChild('amountInput') amountInputRef:ElementRef;
  // @Output() ingredientAdded=new EventEmitter<Ingredient>();
  constructor(private slservice:ShoppingListService) { }

  ngOnInit(){
    this.subscription=this.slservice.startedEditing.subscribe(
      (index:number)=>{
        this.editItemIndex=index;
        this.editMode=true;
        this.editItem=this.slservice.getIngredient(index);
        this.slForm.setValue({
          name:this.editItem.name,
          amount:this.editItem.amount,
        })
      }
    );
  }
  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

  onSubmit(form:NgForm)
  {
    const value=form.value;
    // const ingName=this.nameInputRef.nativeElement.value;
    // const ingAmount=this.amountInputRef.nativeElement.value;
    // const newIngredient= new Ingredient(ingName,ingAmount);
    const newIngredient= new Ingredient(value.name,value.amount);
    if(this.editMode)
    {
      this.slservice.updateIngredient(this.editItemIndex,newIngredient)
    }
    else{
      this.slservice.addIngredient(newIngredient);
    }
    // this.ingredientAdded.emit(newIngredient);
    this.editMode=false;
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.slservice.deleteIngredient(this.editItemIndex);
    this.onClear();
  }
}
