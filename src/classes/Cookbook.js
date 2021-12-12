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

  filterByRecipeName(userInput) {
    if (userInput.length) {
      this.currentRecipes = this.recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(userInput);
      });
    } else {
      this.clearFilter();
    }
  }

  // filterByIngredient(userInput) {
  //   if (userInput.length) {
  //     this.currentRecipes = this.recipes.filter(recipe => {
  //       return recipe.getIngredientNames(this.ingredients).includes(userInput.toLowerCase());
  //     });
  //     console.log(this.currentRecipes)
  //   } else {
  //     this.clearFilter();
  //   }
  // }

  filterByIngredient() {
    if (this.keywords.length) {
      this.currentRecipes = this.recipes.filter(recipe => {
        let ingredientNamesArray = recipe.getIngredientNames(this.ingredients).flat();
        console.log(ingredientNamesArray);
        return this.keywords.every(keyword => ingredientNamesArray.includes(keyword));
      });
      console.log(this.currentRecipes)
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
