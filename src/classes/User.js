class User {
  constructor(user, favRecipes) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = user.pantry;
    this.favoriteRecipes = favRecipes;
    this.mealPlan = [];
  }

  addFavoriteRecipe(favRecipe) {
    let favs = this.favoriteRecipes.currentRecipes;
    if (!favs.includes(favRecipe)) {
      favs.push(favRecipe);
    };
  }

  removeFavoriteRecipe(favRecipe) {
    let favs = this.favoriteRecipes.currentRecipes;
    let index = favs.findIndex(recipe => recipe === favRecipe);
    favs.splice(index, 1);
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

}

export default User;