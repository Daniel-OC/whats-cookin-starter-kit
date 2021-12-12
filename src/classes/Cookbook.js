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

  filterByRecipeName() {
    if (this.keywords.length) {
      this.currentRecipes = this.recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(this.keywords);
      });
    } else {
      this.clearFilter();
    }
  }

  filterByIngredient() {
    if (this.keywords.length) {
      this.currentRecipes = this.recipes.filter(recipe => {
        console.log(recipe.getIngredientNames(this.ingredients).includes(this.keywords))
        return recipe.getIngredientNames(this.ingredients).includes(this.keywords[0]);
      });
      console.log(this.currentRecipes);
    } else {
      this.clearFilter();
    }
  }

  clearFilter() {
    this.currentRecipes = this.recipes;
    this.tags = [];
    this.keywords = [];
  }

}

export default Cookbook;
