class Cookbook {
  constructor(ingredients, recipes) {
    this.ingredients = ingredients;
    this.recipes = recipes || [];
    this.currentRecipes = this.recipes;
    this.tags = [];
    this.keywords = [];
  }

  filterByTag(searchTags, recipeList) {
    this.currentRecipes = recipeList.filter(recipe => {
      return recipe.tags.some(tag => searchTags.includes(tag));
    });
  }

  filterByRecipeName(recipeList) {
    this.currentRecipes = recipeList.filter(recipe => {
      return recipe.name.toLowerCase().split(' ').some(word => this.keywords.includes(word));
    });
  }

  filterByIngredient(recipeList) {
    this.currentRecipes = recipeList.filter(recipe => {
      let ingredientNamesArray = recipe.getIngredientNames(this.ingredients).flat();
      return this.keywords.every(keyword => ingredientNamesArray.includes(keyword));
    });
  }

  clearFilter(recipeList) {
    this.currentRecipes = recipeList || this.recipes;
    this.tags = [];
    this.keywords = [];
  }

  addKeywords(keywords) {
    this.keywords = keywords;
  }
}

export default Cookbook;
