import { expect as _expect } from 'chai';
const expect = _expect;
import Recipe from '../src/classes/Recipe';
import recipeTestData from '../src/data/testing-data/recipe-test-data';

describe('Recipe', () => {
  let recipe;

  beforeEach(() => {
    recipe = new Recipe(recipeTestData[0]);
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
    expect(recipe.name).to.deep.equal('Loaded Chocolate Chip Pudding Cookie Cups')
  });

  it('should have an array of tags', () => {
    expect(recipe.tags).to.be.an('array');
    expect(recipe.tags.length).to.deep.equal(6);
  });

  it('should have instructions', () => {
    expect(recipe.instructions).to.be.an('array');
    expect(recipe.instructions.length).to.deep.equal(1);
  });

  it('should have instructions with steps', () => {
    expect(recipe.instructions[0].instruction).to.deep.equal('Instructions for 1st Recipe');
    expect(recipe.instructions[0].number).to.deep.equal(1);
  });
})
