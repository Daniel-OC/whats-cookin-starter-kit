import { expect as _expect } from 'chai';
const expect = _expect;
import Ingredient from '../src/classes/Ingredient';
import testData from '../src/data/testing-data/ingredients-test-data';

describe('Ingredient', () => {
	let ingredientOne;
	let ingredientTwo;
	let ingredientThree;
	let ingredientFour;
	let ingredientFive;

	beforeEach(() => {
		ingredientOne = new Ingredient(testData.ingredientsData[0])
		ingredientTwo = new Ingredient(testData.ingredientsData[1]) 
		ingredientThree = new Ingredient(testData.ingredientsData[2])
		ingredientFour = new Ingredient(testData.ingredientsData[3])
		ingredientFive = new Ingredient(testData.ingredientsData[4])	
	})

})