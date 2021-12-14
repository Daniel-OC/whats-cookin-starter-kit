class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.mealPlan = [];
  }

  filterFavoritesByRecipeName(cookbook) {
    cookbook.currentRecipes = this.favoriteRecipes.filter(recipe => {
      return recipe.name.toLowerCase().includes(cookbook.keywords.join(" "));
    });
  }

  filterFavoritesByIngredient(cookbook) {
    cookbook.currentRecipes = this.favoriteRecipes.filter(recipe => {
      let ingredientNamesArray = recipe.getIngredientNames(cookbook.ingredients).flat();
      return cookbook.keywords.every(keyword => ingredientNamesArray.includes(keyword));
    });
  }

  filterFavoritesByTag(searchTags, cookbook) {
    cookbook.currentRecipes = this.favoriteRecipes.filter(recipe => {
      return recipe.tags.some(tag => searchTags.includes(tag));
    });
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
}

export default User;
