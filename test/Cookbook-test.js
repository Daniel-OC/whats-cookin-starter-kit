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
    cookbook = new Cookbook(ingredients, recipes);
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

  it('should be able to store tags', () => {
    expect(cookbook.tags).to.be.an('array');
  });

  it('should be able to store all ingredients information', () => {
    expect(cookbook.ingredients).to.be.an('array');
  });

  it('should be able to filter by 1 tag', () => {
    cookbook.filterByTag(['sauce']);
    expect(cookbook.currentRecipes.length).to.deep.equal(1);
  });

  it('should be able to filter by 2 or more tags', () => {
    cookbook.filterByTag(['snack', 'lunch']);
    expect(cookbook.currentRecipes.length).to.deep.equal(2);
  });

  it('should be able to store keywords', () => {
    expect(cookbook.keywords).to.be.an('array');
    cookbook.addKeywords(['loaded', 'chocolate']);
    expect(cookbook.keywords.length).to.deep.equal(2);
  });

  it('should be able to filter by name', () => {
    cookbook.keywords = ['loaded', 'chocolate'];
    cookbook.filterByRecipeName();
    expect(cookbook.currentRecipes.length).to.deep.equal(1);
  });

  it('should be able to filter by ingredient', () => {
    cookbook.filterByIngredient('eggs');
    expect(cookbook.currentRecipes.length).to.deep.equal(3);
  });

  it('should reset search or filter terms', () => {
    cookbook.filterByIngredient('eggs');
    expect(cookbook.currentRecipes.length).to.deep.equal(3);
    cookbook.clearFilter();
    expect(cookbook.currentRecipes).to.deep.equal(cookbook.recipes);
  });
});
