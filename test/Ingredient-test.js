import { expect as _expect } from 'chai';
const expect = _expect;
import Ingredient from '../src/classes/Ingredient';
import testData from '../src/data/testing-data/ingredients-test-data';

describe('Ingredient', () => {
  let ingredientOne;

  beforeEach(() => {
    ingredientOne = new Ingredient(testData.ingredientsData[0]);
  });

  it('should be a function', () => {
    expect(Ingredient).is.a('function');
  });

  it('should be an instantiation of Ingredient', () => {
    expect(ingredientOne).to.be.an.instanceOf(Ingredient);
  });

  it('should have an ID', () => {
    expect(ingredientOne.id).to.deep.equal(20081);
  });

  it('should have a name', () => {
    expect(ingredientOne.name).to.deep.equal("wheat flour");
  });

  it('should contain an estimated cost in cents', () => {
    expect(ingredientOne.estimatedCostInCents).to.deep.equal(142);
  });

});
