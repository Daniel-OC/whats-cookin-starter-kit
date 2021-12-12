class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.image = recipe.image;
    this.tags = recipe.tags;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
  }

  getIngredientNames(ingredientData) {
    return this.ingredients.map(ingredient => {
      return ingredientData.find(data => ingredient.id === data.id).name.toLowerCase().split(' ').flat();
    });
  }

  getCost(ingredientData) {
    let costInCents = 0;
    this.ingredients.forEach(ingredient => {
      costInCents += ingredient.quantity.amount * ingredientData.find(data => ingredient.id === data.id).estimatedCostInCents;
      return costInCents;
    });
    return `$${(costInCents / 100).toFixed(2)}`;
  }

  getInstructions() {
    return this.instructions.map(instruction => {
      return `Step ${instruction.number}: ${instruction.instruction}`;
    });
  }
}


export default Recipe;
