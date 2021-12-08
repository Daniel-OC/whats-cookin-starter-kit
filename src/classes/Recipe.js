import recipeTestData from '../src/data/testing-data/recipe-test-data';
import ingredientTestData from '../src/data/testing-data/ingredients-test-data';

class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.name = recipe.name;
    this.tags = recipe.tags;
    this.instructions = recipe.instructions;
  }

  getIngredientNames() {
    return this.ingredients.map(ingredient => ingredient.name);
  }

  getCost() {
    const totalCost = this.ingredients.reduce((total, ingredient) => {
      let ingredientIds = this.ingredients.map(ingredient => {
        return {
          id: ingredient.id,
          quantity: ingredient.quantity.amount;
        }
      });


      total += .quantity * .estimatedCostInCents;
      return total;
    }, 0);
    return totalCost;
  }

  getInstructions() {
    this.instructions.forEach(instruction => {
      return `Step ${instruction.number}: ${instruction.instruction}`;
    });
  }
}


export default Recipe;
