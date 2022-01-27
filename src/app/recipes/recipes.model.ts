import { Ingredient } from "../shared/ingredient.model";

export class Recipe{
    public name:string;
    public description:string;
    public imagePath:string;
    public ingredients:Ingredient[];

    constructor(nam:string,des:string,imgPth:string,ing:Ingredient[]){
        this.name=nam;
        this.description=des;
        this.imagePath=imgPth;
        this.ingredients=ing;
    }
}
