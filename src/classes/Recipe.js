// import recipeTestData from '../src/data/testing-data/recipe-test-data.js';
// import ingredientTestData from '../src/data/testing-data/ingredients-test-data.js';

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
      return ingredientData.find(data => ingredient.id === data.id).name;
    });

  }

  getCost(ingredientData) {
    const costInCents = this.ingredients.reduce((total, ingredient) => {
      total += ingredient.amount * ingredientData.find(data =>
          data.id === ingredient.id).estimatedCostInCents;
      return total;
    }, 0);
    return `$${(costInCents / 100).toFixed(2)}`;
  }

  getInstructions() {
    this.instructions.forEach(instruction => {
      let step = `Step ${instruction.number}: ${instruction.instruction}`;
      return step;
    });
  }
}


export default Recipe;
