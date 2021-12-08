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
})
