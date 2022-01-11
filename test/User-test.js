import { expect } from 'chai';
import Cookbook from '../src/classes/Cookbook';
import User from '../src/classes/User';
import ingredientTestData from '../src/data/testing-data/ingredients-test-data';
import userTestData from '../src/data/testing-data/user-test-data';
import recipeTestData from '../src/data/testing-data/recipe-test-data';
import Recipe from '../src/classes/Recipe';
import Pantry from '../src/classes/Pantry';


describe('User', () => {
  let ingredients;
  let users;
  let testUser;
  let cookbook;
  let recipes;

  beforeEach(() => {
    recipes = recipeTestData.recipeData.reduce((sum, recipe) => {
      sum.push(new Recipe(recipe));
      return sum;
    }, []);
    ingredients = ingredientTestData.ingredientsData;
    users = userTestData.usersTestData;
    cookbook = new Cookbook(ingredients, recipes);
    testUser = new User(users[0]);

  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instantiation of User', () => {
    expect(testUser).to.be.instanceOf(User);
  });

  it('should have a name', () => {
    expect(testUser.name).to.deep.equal('Saige O\'Kon');
  });

  it('should have an id', () => {
    expect(testUser.id).to.deep.equal(1);
  });

  it('should have a pantry', () => {
    expect(testUser.pantry).to.be.instanceOf(Pantry);
  });

  it('should be able to keep track of favorite recipes', () => {
    expect(testUser.favoriteRecipes).to.be.an('array');
  });

  it('should be able to keep track of meals to cook', () => {
    expect(testUser.mealPlan).to.be.an('array');
  });

  it('should have the ability to store a selectedRecipe', () => {
    expect(testUser.selectedRecipe).to.be.an('null')
  })

  it('should be able to add favorite recipes', () => {
    let newRecipe = new Recipe(recipes[0]);
    testUser.addFavoriteRecipe(newRecipe);
    expect(testUser.favoriteRecipes.length).to.deep.equal(1);
  });

  it('should be able to remove favorite recipes', () => {
    let newRecipe = new Recipe(recipes[0]);
    testUser.addFavoriteRecipe(newRecipe);
    expect(testUser.favoriteRecipes.length).to.deep.equal(1);
    testUser.removeFavoriteRecipe(newRecipe);
    expect(testUser.favoriteRecipes.length).to.deep.equal(0);
  });

  it('should be able to add recipes to mealplan', () => {
    let newRecipe = new Recipe(recipes[0]);
    testUser.addToMealPlan(newRecipe);
    expect(testUser.mealPlan.length).to.deep.equal(1);
  });

  it('should be able to remove recipes from mealplan', () => {
    let newRecipe = new Recipe(recipes[0]);
    testUser.addToMealPlan(newRecipe);
    expect(testUser.mealPlan.length).to.deep.equal(1);
    testUser.removeFromMealPlan(newRecipe);
    expect(testUser.mealPlan.length).to.deep.equal(0);
  });

  it('should have an updatePantry function', () => {
    expect(testUser.updatePantry).to.be.a('function')
  });

  it('should be able to structure a pantry addition to properly feed into the API', () => {
    let pantryAddition = {
      userID: parseInt(1),
      ingredientID: parseInt(11360),
      ingredientModification: parseFloat(1)
    }
    expect(testUser.updatePantry(11360,1)).to.deep.equal(pantryAddition)
  })
});
