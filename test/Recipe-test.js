import { expect as _expect } from 'chai';
const expect = _expect;
import Recipe from '../src/classes/Recipe';
import recipeTestData from '../src/data/testing-data/recipe-test-data';
import ingredientTestData from '../src/data/testing-data/ingredients-test-data';

describe('Recipe', () => {
  let recipe;
  let ingredients;

  beforeEach(() => {
    ingredients = ingredientTestData.ingredientsData;
    recipe = new Recipe(recipeTestData.recipeData[0]);
  });

  it('should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instantiation of Recipe', () => {
    expect(recipe).to.be.an.instanceof(Recipe);
  });

  it('should have an id', () => {
    expect(recipe.id).to.deep.equal(595736);
  });

  it('should have an image', () => {
    expect(recipe.image).to.deep.equal('https://spoonacular.com/recipeImages/595736-556x370.jpg');
  });

  it('should have an array of ingredients', () => {
    expect(recipe.ingredients).to.be.an('array');
    expect(recipe.ingredients.length).to.deep.equal(4);
  });

  it('should have a name', () => {
    expect(recipe.name).to.deep.equal('Loaded Chocolate Chip Pudding Cookie Cups');
  });

  it('should have an array of tags', () => {
    expect(recipe.tags).to.be.an('array');
    expect(recipe.tags.length).to.deep.equal(6);
  });

  it('should have instructions', () => {
    expect(recipe.instructions).to.be.an('array');
    expect(recipe.instructions.length).to.deep.equal(2);
  });

  it('should have instructions with steps', () => {
    expect(recipe.instructions[0].instruction).to.deep.equal('Instructions for 1st Recipe');
    expect(recipe.instructions[0].number).to.deep.equal(1);
  });

  it('should have a have way to get ingredients', () => {
    const ingredientNames = recipe.getIngredientNames(ingredients);

    expect(ingredientNames).to.deep.equal(['wheat flour', 'bicarbonate of soda', 'eggs', 'sucrose']);
  });

  it('should get total cost of recipe', () => {
    const ingredientsCost = recipe.getCost(ingredients);

    expect(ingredientsCost).to.deep.equal('$14.27');
  });

  it('should give instructions', () => {
    const recipeInstructions = recipe.getInstructions();

    expect(recipeInstructions[0]).to.deep.equal('Step 1: Instructions for 1st Recipe');
    expect(recipeInstructions[1]).to.deep.equal('Step 2: Instructions for 2nd Recipe');
  });
});
