class Pantry {
  constructor(ingredients) {
    this.ingredients = ingredients;
  }

  checkPantryInventory(recipe) {
    return recipe.ingredients.reduce((bool, ingredient) => {
      let matchedIng = this.ingredients.find(userIng => userIng.ingredient === ingredient.id)
      if (matchedIng && (matchedIng.amount >= ingredient.quantity.amount)) {

        bool = true;
      } else {
        bool = false;
      }
      return bool;
    }, false)
  }

  listNeededIngredients(recipe) {
    return recipe.ingredients.reduce((neededIngredients, ingredient) => {
      let matchedIng = this.ingredients.find(userIng => userIng.ingredient === ingredient.id)
      if (matchedIng === undefined) {
        let missingIng = { 
          id: ingredient.id, 
          quantity: { 
            amount: ingredient.quantity.amount, 
            unit: ingredient.quantity.unit
          }
        }
        neededIngredients.push(missingIng);
      } else if (matchedIng && (matchedIng.amount < ingredient.quantity.amount)) {
        let neededIng = { 
          id: matchedIng.ingredient, 
          quantity: { 
            amount: ingredient.quantity.amount - matchedIng.amount, 
            unit: ingredient.quantity.unit
          }
        }
        neededIngredients.push(neededIng);
      } 
      return neededIngredients;
    }, [])
  }
}

module.exports = Pantry;