import { expect } from 'chai';
import Cookbook from '../src/classes/Cookbook';
import Recipe from '../src/classes/Recipe';
import recipeTestData from '../src/data/testing-data/recipe-test-data';
import ingredientTestData from '../src/data/testing-data/ingredients-test-data';



describe('Cookbook', () => {
  let recipes;
  let cookbook;
  let recipeData;
  let ingredients;

  beforeEach(() => {
    ingredients = ingredientTestData.ingredientsData;
    recipeData = recipeTestData.recipeData;
    recipes = recipeData.reduce((sum, recipe) => {
      sum.push(new Recipe(recipe));
      return sum;
    }, []);
    cookbook = new Cookbook(recipes, ingredients);
  });

  it('Should be a function', () => {
    expect(Cookbook).to.be.a('function');
  });

  it('should be an instance of Cookbook', () => {
    expect(cookbook).to.be.an.instanceOf(Cookbook);
  });

  it('should store recipes', () => {
    expect(cookbook.recipes).to.be.an('array');
    expect(cookbook.recipes[0]).to.be.an.instanceOf(Recipe);
  });

  it('should be able to filter by 1 tag', () => {
    cookbook.filterByTag(['snack']);
    expect(cookbook.currentRecipes.length).to.deep.equal(2);
  });

  it('should be able to filter by 2 or more tags', () => {
    cookbook.filterByTag(['snack', 'lunch']);
    expect(cookbook.currentRecipes.length).to.deep.equal(2);
  });

  it('should be able to filter by name', () => {
    cookbook.filterByRecipeName('Loaded Chocolate');
    expect(cookbook.currentRecipes.length).to.deep.equal(1);
  });

  it('should be able to filter by ingredient', () => {
    cookbook.filterByIngredient('eggs');
    expect(cookbook.currentRecipes.length).to.deep.equal(3);
  });

  it('should reset search or filter terms', () => {
    cookbook.filterByKeyword('eggs');
    expect(cookbook.currentRecipes.length).to.deep.equal(3);
    cookbook.clearFilter();
    expect(cookbook.currentRecipes).to.deep.equal(cookbook.recipes);
  });
});
