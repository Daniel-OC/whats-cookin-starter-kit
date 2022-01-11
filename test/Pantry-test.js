import { expect } from 'chai';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';
import Pantry from '../src/classes/Pantry';
import ingredientsTestData from '../src/data/testing-data/ingredients-test-data';
import recipeTestData from '../src/data/testing-data/recipe-test-data';
import userTestData from '../src/data/testing-data/user-test-data';
import Cookbook from '../src/classes/Cookbook';

describe('Pantry', () => {
  let recipes;
  let recipeData;
  let ingredients;
  let user;
  let users;

  beforeEach(() => {
    ingredients = ingredientsTestData.ingredientsData;
    recipeData = recipeTestData.recipeData;
    recipes = recipeData.reduce((sum, recipe) => {
      sum.push(new Recipe(recipe));
      return sum;
    }, []);
    users = userTestData.usersTestData;
    user = new User(users[0]);
  })

  it('should be a function', () => {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instance of Pantry', () => {
    expect(user.pantry).to.be.an.instanceOf(Pantry);
  });

  it('should hold an array of all user ingredients', () => {
    expect(user.pantry.ingredients).to.deep.equal(users[0].pantry);
  });

  it('should have checkPantryInventory function', () => {
    expect(user.pantry.checkPantryInventory).to.be.a('function');
  });

  it('should determine if a pantry has enough ingredients to cook a specific meal', () => {
    let mealToCook = recipes[0];

    expect(user.pantry.checkPantryInventory(mealToCook)).to.deep.equal(true);
  });

  it('should determine if a pantry does not have enough ingredients to cook a specific meal', () => {
    let mealToCook = recipes[1];

    expect(user.pantry.checkPantryInventory(mealToCook)).to.deep.equal(false);
  });

  it('should have listNeededIngredients function', () => {
    expect(user.pantry.listNeededIngredients).to.be.a('function');
  });

  it('should determine the amount of ingredients still needed in order to cook a given meal', () => {
    let mealToCook = recipes[1];

    expect(user.pantry.listNeededIngredients(mealToCook)).to.be.deep.equal([
      { id: 18372, quantity: { amount: 0.5, unit: 'tsp' }},
      { id: 19335, quantity: { amount: 1.5, unit: 'c' }}
    ]);
  });

  it('should inform the user of a missing ingredient not currently in their pantry', () => {
    let mealToCook = recipes[2];

    expect(user.pantry.listNeededIngredients(mealToCook)).to.be.deep.equal([
      { id: 19335, quantity: { amount: 5.5, unit: 'c' }},
      { id: 1012046, quantity: { amount: 6.66, unit: 'c' }}
    ]);
  });
})
