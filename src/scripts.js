import './styles.css';
import {recipeCalls, ingredientCalls, userCalls, pantryCalls} from './apiCalls';
import Pantry from '../src/classes/Pantry';
import Cookbook from '../src/classes/Cookbook';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';
import './images/cookin_pan_icon.png';

const clearSearch = document.querySelector('#clearSearch');
const userName = document.querySelector('#userName');
const logoImage = document.querySelector('#logoImage');
const dropDown = document.querySelector('#dropDown');
const searchBar = document.querySelector('#searchBar');
const searchButton = document.querySelector('#searchButton');
const homeButton = document.querySelector('#homeButton');
const favsButton = document.querySelector('#yourFavsButton');
const pantryButton = document.querySelector('#yourPantryButton')
const filterButton = document.querySelector('#filterButton');
const mealPlanButton = document.querySelector('#mealPlanButton');
const sideBarModal = document.querySelector('#sideBarModal');
const mainDisplay = document.querySelector('#mainDisplay');
const bigModal = document.querySelector('#bigModal');
const bigModalInstructions = document.querySelector('#bigModalInstructions');
const bigModalImage = document.querySelector('#bigModalImage');
const bigModalCost = document.querySelector('#bigModalCost');
const bigModalIngredients = document.querySelector('#bigModalIngredients');
const aside = document.querySelector('#aside');
const pantryModal = document.querySelector('#pantryModal');
const table = document.getElementById('table');
const tableBody = document.getElementById('tableBody')
const pantryDropdown = document.querySelector('#pantryDropdown');
const customAddIngredientButton = document.querySelector('#addIngredientButton')
const toggleAllIngredientsButton = document.querySelector('#toggleAllIngredients')
const toggleNeededIngredientsButton = document.querySelector('#toggleNeededIngredients')

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
  createNewUser(data);
}

const createNewUser = (data) => {
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
  })
  await updateUserData();
}

// helper functions

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function updateInnerText(element, update) {
  element.innerText = update;
}

function removeClass(elements, rule) {
  elements.forEach(item => item.classList.remove(rule));
}

function addClass(elements, rule) {
  elements.forEach(item => item.classList.add(rule));
}

// Event handlers and their constituent functions

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
  mainDisplay.innerText= message;
}

const updateMainDisplay = () => {
  if (cookbook.currentRecipes.length) {
    displayCurrentRecipes();
  } else {
    displayErrorMessage();
  }
}

const displayErrorMessage = () => {
  mainDisplay.innerText = "Sorry, no recipes match your criteria!";
}

const displayCurrentRecipes = () => {
  let display = cookbook.currentRecipes;
  mainDisplay.innerHTML = '';
  display.forEach(recipe => {
      mainDisplay.innerHTML += `
    <section class="card flex column sml-brdr-radius shadow">
      <button class="recipe-images full-width half-height recipe-image clickable" id="${recipe.id}" alt="${recipe.name} smaller meal image" aria-label=${recipe.name}></button>
      <section class="flex row around full-width half-height yellow">
        <p class="full-width med-font not-clickable">${recipe.name}</p>
        <section class="flex column around basis half-width full-height">
					<button class="icon far fa-heart fa-2x clickable red" id="heart${recipe.id}"></button>
					<button class="icon fas fa-plus fa-2x clickable" id="plus${recipe.id}"></button>
        </section>
      </section>
    </section>`
  })
  loadRecipeImages();
  fillIconsOnLoad();
}

const loadRecipeImages = () => {
  let recipeButtons = document.querySelectorAll('.recipe-images');
  recipeButtons.forEach(button => {
    let matchingID = recipes.find(recipe => recipe.id === parseInt(button.id));
    if (matchingID) {
      button.style.backgroundImage = `url(${matchingID.image})`;
    }
  })
}

const fillIconsOnLoad = () => {
  let heartIcons = document.querySelectorAll('.fa-heart');
  let plusIcons = document.querySelectorAll('.fa-plus');
  let favoriteIds = user.favoriteRecipes.map(recipe => recipe.id);
  let mealplanIds = user.mealPlan.map(recipe => recipe.id);
  heartIcons.forEach(heart => {
    if (favoriteIds.includes(parseInt(heart.id.slice(5)))) {
      heart.classList.add('fas');
    }
  });
  plusIcons.forEach(plus => {
    if (mealplanIds.includes(parseInt(plus.id.slice(4)))) {
      plus.classList.add('plus');
    }
  });
}

const displayBigModal = (event) => {
  removeClass([bigModal, homeButton, favsButton, toggleNeededIngredientsButton], 'hidden');
  addClass([mainDisplay, aside, toggleAllIngredientsButton], 'hidden');
  populateBigModal(event);
}

const populateBigModal = (event) => {
  user.selectedRecipe = cookbook.currentRecipes.find(recipe => recipe.id === parseInt(event.target.id));
  bigModalImage.src = user.selectedRecipe.image;
  updateInnerText(bigModalInstructions, user.selectedRecipe.name);
  populateBigModalImageAndText(user.selectedRecipe);
  populateBigModalInstructions(user.selectedRecipe);
  populateBigModalIngredients(user.selectedRecipe);
  updateInnerText(bigModalCost, user.selectedRecipe.getCost(cookbook.ingredients));
}

const populateBigModalImageAndText = (selectedRecipe) => {
  bigModalImage.src = selectedRecipe.image;
  updateInnerText(bigModalInstructions, selectedRecipe.name);
  updateInnerText(bigModalCost, selectedRecipe.getCost(cookbook.ingredients));
}

const populateBigModalInstructions = (selectedRecipe) => {
  selectedRecipe.instructions.forEach((instruction, i) => {
    bigModalInstructions.innerHTML += `<li class="med-top-marg med-font">${selectedRecipe.getInstructions()[i]}</li>`;
  });
}

const populateBigModalIngredients = (selectedRecipe) => {
  bigModalIngredients.innerHTML = ""
  selectedRecipe.ingredients.forEach((ingredient, i) => {
    bigModalIngredients.innerHTML += `<li class="flex align-start text-align med-left-marg med-top-marg med-font"><b>${selectedRecipe.ingredients[i].quantity.amount}</b>x ${selectedRecipe.ingredients[i].quantity.unit} ${selectedRecipe.getIngredientNames(ingredients)[i].join(' ')}</em></li>`;
  });
}

const clickHomeButton = () => {
  addClass([homeButton, bigModal, pantryModal], 'hidden');
  removeClass([mainDisplay, favsButton, , pantryButton, aside], 'hidden');
  cookbook.clearFilter();
  populateFilterTags(getFilterTags());
  updateMainDisplay();
  hideSearchFunctionality();
}

const hideSearchFunctionality = () => {
  if (!pantryButton.classList.contains('hidden')) {
    removeClass([dropDown, searchBar, searchButton], 'hidden')
  } else {
    addClass([dropDown, searchBar, searchButton], 'hidden');
    removeClass([pantryModal], 'hidden');
  }
}

const clickFilterButton = () => {
  if (favsButton.classList.contains('hidden')) {
    clickFilterFavView();
  } else {
    clickFilterHomeView();
  }
}

const clickFilterFavView = () => {
  if (sideBarModal.classList.contains('hidden')) {
    addClass([filterButton], 'orange');
    removeClass([sideBarModal], 'hidden');
    let tags = getFilterTags();
    populateFilterTags(tags);
    updateInnerText(filterButton, 'Clear Filters');
  } else {
    addClass([sideBarModal], 'hidden');
    removeClass([filterButton], 'orange');
    cookbook.currentRecipes = user.favoriteRecipes;
    cookbook.tags = []
    updateMainDisplay();
    clearCheckBoxes();
  }
}

const clickFilterHomeView = () => {
  if (sideBarModal.classList.contains('hidden')) {
    addClass([filterButton], 'orange');
    removeClass([sideBarModal], 'hidden');
    let tags = getFilterTags();
    populateFilterTags(tags);
    updateInnerText(filterButton, 'Clear Filters');
  } else {
    addClass([sideBarModal], 'hidden');
    removeClass([filterButton], 'orange');
    cookbook.clearFilter();
    updateMainDisplay();
    clearCheckBoxes();
  }
}

const clearCheckBoxes = () => {
  sideBarModal.innerHTML = '';
  updateInnerText(filterButton, 'Filter');
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

const populateFilterTags = (tags) => {
  sideBarModal.innerHTML = '';
  tags.forEach(tag => {
    sideBarModal.innerHTML += `
    <section class="flex column align-start eighty-width sml-marg">
      <section class="flex row">
        <input class="filter" type="checkbox" name="${tag}" id="${tag}"/ >
        <label for="${tag}">${tag}</label>
      </section>
    </section>`;
  });
}

const displayByTag = (tag) => {
  if (favsButton.classList.contains('hidden')) {
    displayAllByTag(tag, user.favoriteRecipes);
  } else {
    displayAllByTag(tag, cookbook.recipes);
  }
  updateMainDisplay();
}

const determineSidebarModalEventTarget = (event) => {
  if (event.target.classList.contains('filter')) {
    displayByTag(event.target.id);
  } else if (event.target.classList.contains('fa-times')) {
    let selectedMeal = user.mealPlan.find(meal => `delete${meal.id}` === event.target.id);
    user.removeFromMealPlan(selectedMeal);
    displayMealsToCook();
    updateMainDisplay();
  } else if (event.target.classList.contains('meals')) {
    displayBigModal(event);
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
    addClass([event.target], 'fas');
    user.addFavoriteRecipe(selectedRecipe);
  } else {
    removeClass([event.target], 'fas');
    user.removeFavoriteRecipe(selectedRecipe);
    updateMainDisplay();
  }
}

const toggleMealPlan = (selectedRecipe, event) => {
  if (!user.mealPlan.includes(selectedRecipe)) {
    addClass([event.target], 'plus');
    user.addToMealPlan(selectedRecipe);
  } else {
    removeClass([event.target], 'plus')
    user.removeFromMealPlan(selectedRecipe);
  }
  displayMealsToCook();
}

const handleLackOfChoice = (recipeList) => {
  if (dropDown.value) {
    dropDown.classList.remove('drop-down-error');
    searchForRecipe(recipeList);
  } else {
    dropDown.classList.add('drop-down-error');
    mainDisplay.innerText = "Please select a category for your search";
  }
}

const determineRecipeList = (event) => {
  removeClass([clearSearch], 'hidden');
  if (favsButton.classList.contains('hidden')) {
    handleLackOfChoice(user.favoriteRecipes);
  } else {
    handleLackOfChoice(cookbook.currentRecipes);
  }
  cookbook.clearFilter();
}

const searchForRecipe = (recipeList) => {
  let search = searchBar.value.toLowerCase();
  cookbook.addKeywords(search.split(' '));
  if (dropDown.value === 'name' && searchBar.value) {
    cookbook.filterByRecipeName(recipeList);
    updateMainDisplay();
  } else if (dropDown.value === 'ingredient' && searchBar.value) {
    cookbook.filterByIngredient(recipeList);
    updateMainDisplay();
  }
}

const createUser = () => {
  userName.innerText = user.name;
}

const startSite = () => {
  updateMainDisplay();
  createUser();
}

const displayFavs = () => {
  cookbook.currentRecipes = user.favoriteRecipes;
  updateMainDisplay();
  cookbook.tags = [];
  populateFilterTags(getFilterTags());
  addClass([favsButton, bigModal, pantryModal], 'hidden');
  removeClass([homeButton, mainDisplay, aside, pantryButton], 'hidden');
  hideSearchFunctionality();
}

const displayMealsToCook = () => {
  sideBarModal.innerHTML = '';
  user.mealPlan.forEach(meal => {
    sideBarModal.innerHTML += `
    <section class="flex column align-start eighty-width sml-marg">
      <section class="flex row">
        <i class="fas fa-times fa-2x sml-right-marg clickable red" id="delete${meal.id}"></i>
        <button class="meals" id="${meal.id}">${meal.name}</button>
      </section>
    </section>`;
  });
}

const populateMealsToCook = () => {
  if (sideBarModal.classList.contains('hidden')) {
    removeClass([sideBarModal], 'hidden');
    addClass([mealPlanButton], 'orange');
    displayMealsToCook();
  } else {
    removeClass([mealPlanButton], 'orange');
    addClass([sideBarModal], 'hidden');
  }
}

const clearSearchBar = () => {
  if (favsButton.classList.contains('hidden')) {
    cookbook.currentRecipes = user.favoriteRecipes;
  }
  searchBar.value = null;
  addClass([clearSearch], 'hidden');
  updateMainDisplay();
};

const determineMainDisplayEventTarget = (event) => {
  if (event.target.classList.contains('recipe-images')) {
    displayBigModal(event)
  } else if (event.target.classList.contains('fa-heart')) {
    user.selectedRecipe = cookbook.recipes.find(recipe => `heart${recipe.id}` === event.target.id);
    toggleFavoriteRecipe(user.selectedRecipe, event);
  } else if (event.target.classList.contains('fa-plus')) {
    user.selectedRecipe = cookbook.recipes.find(recipe => `plus${recipe.id}` === event.target.id);
    toggleMealPlan(user.selectedRecipe, event);
  }
}

const resetBigModalForPantry = () => {
 tableBody.innerHTML = "" 
}

const populatePantryDropDown = () => {
  pantryDropdown.innerHTML = `<option value="" disabled selected hidden>Select an Ingredient</option>`
  ingredients.forEach(ingredient => {
    pantryDropdown.innerHTML += `
    <option value="${ingredient.id}">${ingredient.name}</option>`
  })
}

const displayUserIngredients = (tableBody, allIngs) => {
  user.pantry.ingredients.forEach(ingredient => {
    let matchingName = ingredients.find(entry => entry.id === ingredient.ingredient);
    let matchingAmounts = user.pantry.ingredients.find(entry => entry.ingredient === ingredient.ingredient);
    let matchingUnits = allIngs.find(entry => entry.id === ingredient.ingredient);
    tableBody.innerHTML += `
    <tr>
      <td>${matchingName.name}</td>
      <td>${matchingAmounts.amount}</td>
      <td>${matchingUnits.quantity.unit}</td>
      <td class="no-bg">
        <button class="icon fas fa-minus-circle fa-2x clickable" id="subtract${ingredient.ingredient}"></button>
        <button class="icon fas fa-plus-circle fa-2x clickable" id="add${ingredient.ingredient}"></button>
      </td>
    </tr>`;
  });
} 
const populatePantryDisplay = () => {
  resetBigModalForPantry();
  let allIngredients = cookbook.recipes.flatMap(recipe => recipe.ingredients);
  displayUserIngredients(tableBody, allIngredients);
  populatePantryDropDown()
  addClass([mainDisplay, pantryButton, bigModal, aside], 'hidden');
  removeClass([pantryModal, homeButton, favsButton], 'hidden');
  hideSearchFunctionality();
}

async function determinePantryDisplayEventTarget(event) {
  if (event.target.classList.contains('fa-minus-circle')) {
    let selectedIngredient = ingredients.find(ing => `subtract${ing.id}` === event.target.id)
    await removeIndividualIngredientFromPantry(selectedIngredient.id, -1)
  } else if (event.target.classList.contains('fa-plus-circle')) {
    let selectedIngredient = ingredients.find(ing => `add${ing.id}` === event.target.id)
    await addIngredientToPantry(selectedIngredient.id, 1)
  } 
  populatePantryDisplay();
}

async function addCustomIngredientToPantry() {
  let customIngredient = pantryDropdown.value;
  let customAmount = document.querySelector('#addIngredientAmount')
  await addIngredientToPantry(customIngredient, customAmount.value)
  populatePantryDisplay()
  customAmount.value = ""
}

const showIngredientsNeeded = () => {
  if (user.pantry.checkPantryInventory(user.selectedRecipe)) {
    bigModalIngredients.innerHTML = `<p class="flex align-start text-align med-left-marg med-top-marg med-font">You have all the ingredients you need, let's get cooking!</p>`
  } else {
    let neededIngredients = user.pantry.listNeededIngredients(user.selectedRecipe)
    bigModalIngredients.innerHTML = ""
    neededIngredients.forEach((neededIngredient, i) => {
      let matchingName = ingredients.find(entry => entry.id === neededIngredient.id);
      bigModalIngredients.innerHTML  += `<li class="flex align-start text-align med-left-marg med-top-marg med-font red"><b>${neededIngredient.quantity.amount}</b>x ${neededIngredient.quantity.unit} ${matchingName.name}</em></li>`
    })
  }
  removeClass([toggleAllIngredientsButton], 'hidden')
  addClass([toggleNeededIngredientsButton], 'hidden')
}

const determineBigModalEventTarget = (event) => {
  if (event.target.classList.contains('toggle-needed-ingredients')) {
    showIngredientsNeeded()
  } else if (event.target.classList.contains('toggle-all-ingredients')) {
    populateBigModalIngredients(user.selectedRecipe)
    addClass([toggleAllIngredientsButton], 'hidden')
    removeClass([toggleNeededIngredientsButton], 'hidden')

  } 
}

bigModal.addEventListener('click', determineBigModalEventTarget)

toggleNeededIngredientsButton.addEventListener('click', showIngredientsNeeded)

customAddIngredientButton.addEventListener('click', addCustomIngredientToPantry)

table.addEventListener('click', async (e) => {
  await determinePantryDisplayEventTarget(e);
})

mainDisplay.addEventListener('click', (e) => {
  determineMainDisplayEventTarget(e);
});

sideBarModal.addEventListener('click', (e) => {
  determineSidebarModalEventTarget(e);
});

clearSearch.addEventListener('click', clearSearchBar);

mealPlanButton.addEventListener('click', populateMealsToCook);

favsButton.addEventListener('click', displayFavs);

pantryButton.addEventListener('click', populatePantryDisplay);

filterButton.addEventListener('click', clickFilterButton);

homeButton.addEventListener('click', clickHomeButton);

logoImage.addEventListener('click', () => {
  location.reload();
});

searchButton.addEventListener('click', determineRecipeList);

searchBar.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    determineRecipeList();
  }
});
