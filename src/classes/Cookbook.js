class Cookbook {
  constructor(ingredients, recipes) {
    this.ingredients = ingredients;
    this.recipes = recipes || [];
    this.currentRecipes = this.recipes;
    this.tags = [];
    this.keywords = [];
  }

  filterByTag(searchTags) {
    if (this.tags.length) {
      this.currentRecipes = this.recipes.filter(recipe => {
        return recipe.tags.some(tag => searchTags.includes(tag));
      });
    } else {
      this.clearFilter();
    }
  }

  filterByRecipeName(keywords) {
    if (this.keywords.length) {
      this.currentRecipes = this.recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(keywords.toLowerCase());
      });
    } else {
      this.clearFilter();
    }
  }

  filterByIngredient(keywords) {
    if (this.keywords.length) {
      this.currentRecipes = this.recipes.filter(recipe => {
        return recipe.getIngredientNames(this.ingredients).includes(keywords.toLowerCase());
      });
    } else {
      this.clearFilter();
    }
  }

  clearFilter() {
    this.currentRecipes = this.recipes;
  }
}

export default Cookbook;
