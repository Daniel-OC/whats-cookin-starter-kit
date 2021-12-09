class Cookbook {
  constructor(recipes, ingredients) {
    this.recipes = recipes;
    this.ingredients = ingredients;
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
    })
  }
}

export default Cookbook;
