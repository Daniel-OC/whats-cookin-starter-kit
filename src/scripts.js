import {recipeCalls, ingredientCalls, userCalls, pantryCalls} from './apiCalls';
import {
  domUpdates,
  mainDisplay,
  favsButton,
  dropDown,
  clearSearch,
  searchBar,
  pantryDropdown,
  customAmount,
  cookMealButton,
  filterButton,
  toggleAllIngredientsButton,
  toggleNeededIngredientsButton
} from './domUpdates';
import Pantry from '../src/classes/Pantry';
import Cookbook from '../src/classes/Cookbook';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';
import './images/cookin_pan_icon.png';
import './css/index.scss';

let cookbook;
let user;
let ingredients;
let recipes;

Promise.all([recipeCalls, ingredientCalls, userCalls])
  .then(data => {
    createAllData(data);
    startSite();
  }).catch(error => displayFetchErrorMessage(error));

Promise.resolve(pantryCalls)
.then(response => checkForError(response))
.then(data => console.log(data))
.catch(error => displayFetchErrorMessage(error))

async function updateUserData() {
  let response = await fetch('http://localhost:3001/api/v1/users');
  let data = await response.json();
  await createNewUser(data);
}

async function createNewUser(data) {
  let newUser = data.find(newUser => newUser.id === user.id);
  user.pantry = new Pantry(newUser.pantry);
}

const createAllData = (data) => {
  createGlobalIng(data);
  recipes = createGlobalRecipes(data);
  createGlobalCookbook(data, recipes);
  createGlobalUser(data);
}

const createGlobalIng = (data) => {
  ingredients = data[1];
}

const createGlobalUser = (data) => {
  user = new User(data[2][getRandomIndex(data[2])]);
}

const createGlobalCookbook = (data, recipes) => {
  cookbook = new Cookbook(data[1], recipes);
}

const createGlobalRecipes = (data) => {
  return data[0].reduce((sum, recipe) => {
    sum.push(new Recipe(recipe));
    return sum;
  }, []);
}

async function addIngredientToPantry(ingredient, amount) {
  let update = await user.updatePantry(ingredient, amount);
  await pantryCalls(update);
  await updateUserData();
}

async function removeIndividualIngredientFromPantry(ingredient, amount) {
  let update = await user.updatePantry(ingredient, amount);
  await pantryCalls(update);
  await updateUserData();
}

async function removeIngredientsFromPantry(recipe) {
  await recipe.ingredients.forEach(async (ingredient) => {
    let update = await user.updatePantry(ingredient.id, -ingredient.quantity.amount);
    await pantryCalls(update);
    await updateUserData();
  })
}

// helper functions

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

const checkForError = (response) => {
  if (!response.ok) {
    throw new Error('Please make sure that all fields are filled out.');
  } else {
    return response.json();
  }
}

const displayFetchErrorMessage = (error) => {
  let message;
  if (error.message === 'Failed to fetch') {
    message = 'Something went wrong. Please check your internet connection';
  } else {
    message = error.message;
  }
  domUpdates.updateInnerText(mainDisplay, message);
}

const getFilterTags = () => {
  return cookbook.recipes.reduce((accumulator, recipe) => {
    recipe.tags.forEach(tag => {
      if (!accumulator.includes(tag)) {
        accumulator.push(tag);
      }
    });
    return accumulator;
  }, []);
}

const displayByTag = (tag) => {
  if (favsButton.classList.contains('hidden')) {
    displayAllByTag(tag, user.favoriteRecipes);
  } else {
    displayAllByTag(tag, cookbook.recipes);
  }
  domUpdates.updateMainDisplay();
}

const determineSidebarModalEventTarget = (event) => {
  if (event.target.classList.contains('filter')) {
    displayByTag(event.target.id);
  } else if (event.target.classList.contains('fa-times')) {
    let selectedMeal = user.mealPlan.find(meal => `delete${meal.id}` === event.target.id);
    user.removeFromMealPlan(selectedMeal);
    domUpdates.displayMealsToCook();
    domUpdates.updateMainDisplay();
  } else if (event.target.classList.contains('meals')) {
    domUpdates.displayBigModal(event);
  }
}

const displayAllByTag = (tag, recipeList) => {
  if (!cookbook.tags.includes(tag)) {
    cookbook.tags.push(tag);
    cookbook.filterByTag(cookbook.tags, recipeList);
  } else if (cookbook.tags.includes(tag) && cookbook.tags.length > 1) {
    cookbook.tags.splice(cookbook.tags.indexOf(tag), 1);
    cookbook.filterByTag(cookbook.tags, recipeList);
  } else if (cookbook.tags.includes(tag) && cookbook.tags.length === 1) {
    cookbook.clearFilter(recipeList);
  }
}

const toggleFavoriteRecipe = (selectedRecipe, event) => {
  if (!user.favoriteRecipes.includes(selectedRecipe)) {
    domUpdates.addClass([event.target], 'fas');
    user.addFavoriteRecipe(selectedRecipe);
  } else {
    domUpdates.removeClass([event.target], 'fas');
    user.removeFavoriteRecipe(selectedRecipe);
    domUpdates.updateMainDisplay();
  }
}

const toggleMealPlan = (selectedRecipe, event) => {
  if (!user.mealPlan.includes(selectedRecipe)) {
    domUpdates.addClass([event.target], 'plus');
    user.addToMealPlan(selectedRecipe);
  } else {
    domUpdates.removeClass([event.target], 'plus')
    user.removeFromMealPlan(selectedRecipe);
  }
  filterButton.classList.contains('hidden') ? domUpdates.displayMealsToCook() : null;
}

const handleLackOfChoice = (recipeList) => {
  if (dropDown.value) {
    domUpdates.removeClass([dropDown], 'drop-down-error');
    searchForRecipe(recipeList);
  } else {
    domUpdates.addClass([dropDown], 'drop-down-error');
    domUpdates.updateInnerText(mainDisplay, "Please select a category for your search");
  }
}

function determineRecipeList(event) {
  domUpdates.removeClass([clearSearch], 'hidden');
  if (favsButton.classList.contains('hidden')) {
    handleLackOfChoice(user.favoriteRecipes);
  } else {
    handleLackOfChoice(cookbook.currentRecipes);
  }
  cookbook.clearFilter();
  domUpdates.resetInputField(searchBar);
}

const searchForRecipe = (recipeList) => {
  let search = searchBar.value.toLowerCase();
  cookbook.addKeywords(search.split(' '));
  if (dropDown.value === 'name' && searchBar.value) {
    cookbook.filterByRecipeName(recipeList);
    domUpdates.updateMainDisplay();
  } else if (dropDown.value === 'ingredient' && searchBar.value) {
    cookbook.filterByIngredient(recipeList);
    domUpdates.updateMainDisplay();
  }
}

const startSite = () => {
  domUpdates.updateMainDisplay();
  domUpdates.createUser();
}

function clearSearchBar() {
  if (favsButton.classList.contains('hidden')) {
    cookbook.currentRecipes = user.favoriteRecipes;
  }
  searchBar.value = null;
  domUpdates.addClass([clearSearch], 'hidden');
  domUpdates.updateMainDisplay();
};

const determineMainDisplayEventTarget = (event) => {
  if (event.target.classList.contains('recipe-images')) {
    domUpdates.displayBigModal(event);
  } else if (event.target.classList.contains('fa-heart')) {
    user.selectedRecipe = cookbook.recipes.find(recipe => `heart${recipe.id}` === event.target.id);
    toggleFavoriteRecipe(user.selectedRecipe, event);
  } else if (event.target.classList.contains('fa-plus')) {
    user.selectedRecipe = cookbook.recipes.find(recipe => `plus${recipe.id}` === event.target.id);
    toggleMealPlan(user.selectedRecipe, event);
  }
}

async function determinePantryDisplayEventTarget(event) {
  if (event.target.classList.contains('fa-minus-circle')) {
    let selectedIngredient = ingredients.find(ing => `subtract${ing.id}` === event.target.id);
    await removeIndividualIngredientFromPantry(selectedIngredient.id, -1);
  } else if (event.target.classList.contains('fa-plus-circle')) {
    let selectedIngredient = ingredients.find(ing => `add${ing.id}` === event.target.id);
    await addIngredientToPantry(selectedIngredient.id, 1);
  }
  domUpdates.populatePantryDisplay();
}

async function addCustomIngredientToPantry() {
  let customIngredient = pantryDropdown.value;
  await addIngredientToPantry(customIngredient, customAmount.value);
  domUpdates.populatePantryDisplay();
  domUpdates.resetInputField(customAmount);
}

const toggleIngredientsNeeded = () => {
  if (user.pantry.checkPantryInventory(user.selectedRecipe)) {
    domUpdates.displayYouCanCookMessage();
    domUpdates.removeClass([cookMealButton], 'hidden');
  } else {
    domUpdates.displayNeededIngredients();
  }
  domUpdates.removeClass([toggleAllIngredientsButton], 'hidden');
  domUpdates.addClass([toggleNeededIngredientsButton], 'hidden');
}

async function determineBigModalEventTarget(event) {
  if (event.target.classList.contains('toggle-needed-ingredients')) {
    toggleIngredientsNeeded();
  } else if (event.target.classList.contains('toggle-all-ingredients')) {
    domUpdates.populateBigModalIngredients(user.selectedRecipe);
    domUpdates.addClass([toggleAllIngredientsButton], 'hidden');
    domUpdates.removeClass([toggleNeededIngredientsButton], 'hidden');
  } else if (event.target.classList.contains('cook-meal')) {
    await removeIngredientsFromPantry(user.selectedRecipe);
    domUpdates.displaySuccessfullyCookedMealMessage();
    domUpdates.addClass([cookMealButton, toggleNeededIngredientsButton], 'hidden');
    domUpdates.removeClass([toggleAllIngredientsButton], 'hidden');
  }
}

export {
  cookbook,
  user,
  ingredients,
  recipes,
  updateUserData,
  createNewUser,
  createAllData,
  createGlobalIng,
  createGlobalUser,
  createGlobalCookbook,
  createGlobalRecipes,
  addIngredientToPantry,
  removeIndividualIngredientFromPantry,
  removeIngredientsFromPantry,
  getFilterTags,
  displayByTag,
  determineSidebarModalEventTarget,
  displayAllByTag,
  toggleFavoriteRecipe,
  toggleMealPlan,
  handleLackOfChoice,
  determineRecipeList,
  searchForRecipe,
  startSite,
  clearSearchBar,
  determineMainDisplayEventTarget,
  determinePantryDisplayEventTarget,
  addCustomIngredientToPantry,
  toggleIngredientsNeeded,
  determineBigModalEventTarget
};
