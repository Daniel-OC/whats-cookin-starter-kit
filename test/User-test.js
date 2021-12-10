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
    expect(User).to.be.a('function')
  });

  it('should be an instantiation of User', () => {
    expect(testUser).to.be.instanceOf(User)
  });

  it('should have a name', () => {
    expect(testUser.name).to.deep.equal('Saige O\'Kon')
  });

  it('should have an id', () => {
    expect(testUser.id).to.deep.equal(1)
  });

  it('should have a pantry', () => {
    expect(testUser.pantry).to.be.an('array')
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