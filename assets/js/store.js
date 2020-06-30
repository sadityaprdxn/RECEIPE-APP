
export default class StoreData {

    constructor( name, receipe, ingredientArray) {
    this.name = name;
    this.receipe = receipe;
    this.AvailableIngredient = [];
    this.NonAvailableIngredient = [];
        debugger;
        ingredientArray.forEach(element => {
            if(element.checked) {
                this.AvailableIngredient.push(element.value);
            } else {
                this.NonAvailableIngredient.push(element.value);
            }
        });
    }
}