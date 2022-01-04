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

  // filterByRecipeName() {
  //   if (this.keywords.length) {
  //     this.currentRecipes = this.currentRecipes.filter(recipe => {
  //       return recipe.name.toLowerCase().includes(this.keywords.join(" "));
  //     });
  //   }
  //   else {
  //     this.clearFilter();
  //   }
  // }

  filterByRecipeName(recipeList) {
    this.currentRecipes = recipeList.filter(recipe => {
      return recipe.name.toLowerCase().includes(this.keywords.join(" "));
    });
  }

  filterByIngredient() {
    if (this.keywords.length) {
      this.currentRecipes = this.recipes.filter(recipe => {
        let ingredientNamesArray = recipe.getIngredientNames(this.ingredients).flat();
        return this.keywords.every(keyword => ingredientNamesArray.includes(keyword));
      });
    } else {
      this.clearFilter();
    }
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
