class Cookbook {
  constructor(ingredients, recipes) {
    this.ingredients = ingredients;
    this.recipes = recipes || [];
    this.currentRecipes = this.recipes;
  }

  filterByTag(searchTags) {
    this.currentRecipes = this.recipes.filter(recipe => {
      return recipe.tags.some(tag => searchTags.includes(tag));
    });
  }

  filterByRecipeName(keywords) {
    this.currentRecipes = this.recipes.filter(recipe => {
      return recipe.name.toLowerCase().includes(keywords.toLowerCase());
    });
  }

  filterByIngredient(keywords) {
    this.currentRecipes = this.recipes.filter(recipe => {
      return recipe.getIngredientNames(this.ingredients).includes(keywords.toLowerCase());
    });
  }

  clearFilter() {
    this.currentRecipes = this.recipes;
  }
}

export default Cookbook;
