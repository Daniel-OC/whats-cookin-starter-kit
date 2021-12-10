import { expect } from 'chai';
import Cookbook from '../src/classes/Cookbook';
import User from '../src/classes/User';
// import recipeTestData from '../src/data/testing-data/recipe-test-data';
import ingredientTestData from '../src/data/testing-data/ingredients-test-data';
import userTestData from '../src/data/testing-data/user-test-data';


describe('User', () => {
  let ingredients
  let users 
  let testUser;
  let favorites
  
  beforeEach(() => {
    ingredients = ingredientTestData.ingredientsData
    users = userTestData.userData
    favorites = new Cookbook(ingredients)
    testUser = new User(users[0], favorites)

  });

  it('should be a function', () => {
    
  });

  it('should be an instantiation of User', () => {

  });

  it('should have a name', () => {

  });

  it('should have an ID', () => {

  });

  it('should have a pantry', () => {

  });

  it('should be able to keep track of favorite recipes', () => {

  });

  it('should be able to keep track of meals to cook', () => {


  });

  it('should be able to add favorite recipes', () => {

  });

  it('should be able to remove favorite recipes', () => {

  });

  it('should be able to add recipes to mealplan', () => {

  });

  it('should be able to remove recipes from mealplan', () => {

  });

});