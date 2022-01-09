import Pantry from "./Pantry";

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = new Pantry(user.pantry);
    this.favoriteRecipes = [];
    this.mealPlan = [];
    this.selectedRecipe = null;
  }

  addFavoriteRecipe(favRecipe) {
    if (!this.favoriteRecipes.includes(favRecipe)) {
      this.favoriteRecipes.push(favRecipe);
    };
  }

  removeFavoriteRecipe(favRecipe) {
    let index = this.favoriteRecipes.findIndex(recipe => recipe === favRecipe);
    this.favoriteRecipes.splice(index, 1);
  }

  addToMealPlan(meal) {
    let meals = this.mealPlan;
    if (!meals.includes(meal)) {
      meals.push(meal);
    };
  }

  removeFromMealPlan(meal) {
    let meals = this.mealPlan;
    let index = meals.findIndex(recipe => recipe === meal);
    meals.splice(index, 1);
  }

  updatePantry(ingredient, amount) {
    return {
      userID: parseInt(this.id),
      ingredientID: parseInt(ingredient),
      ingredientModification: parseFloat(amount)
    }
  }
}

export default User;
