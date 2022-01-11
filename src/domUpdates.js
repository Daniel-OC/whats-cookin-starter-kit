import {
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
} from './scripts';

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
const customAddIngredientButton = document.querySelector('#addIngredientButton');
const toggleAllIngredientsButton = document.querySelector('#toggleAllIngredients');
const toggleNeededIngredientsButton = document.querySelector('#toggleNeededIngredients');
const cookMealButton = document.querySelector('#cookMeal');
const customAmount = document.querySelector('#addIngredientAmount');

let domUpdates = {
  updateInnerText(element, update) {
    element.innerText = update;
  },

  toggleClass(elements, rule) {
    elements.forEach(item => item.classList.toggle(rule));
  },

  removeClass(elements, rule) {
    elements.forEach(item => item.classList.remove(rule));
  },

  addClass(elements, rule) {
    elements.forEach(item => item.classList.add(rule));
  },

  updateMainDisplay() {
    if (cookbook.currentRecipes.length) {
      domUpdates.displayCurrentRecipes();
    } else {
      domUpdates.displayErrorMessage();
    }
  },

  displayErrorMessage() {
    domUpdates.updateInnerText(mainDisplay, "Sorry, no recipes match your criteria!");
  },

  displayCurrentRecipes() {
    let display = cookbook.currentRecipes;
    mainDisplay.innerHTML = '';
    display.forEach(recipe => {
      mainDisplay.innerHTML += `
        <section class="card flex column sml-brdr-radius shadow">
          <button class="recipe-images full-width half-height recipe-image clickable" id="${recipe.id}" aria-label="inspect ${recipe.name} recipe button"></button>
          <section class="flex row around full-width half-height yellow">
            <p class="full-width med-font not-clickable">${recipe.name}</p>
            <section class="flex column around basis half-width full-height">
    					<button class="far fa-heart fa-2x no-brdr no-back blink clickable red" id="heart${recipe.id}" aria-label="${recipe.name} add to favorites button"></button>
    					<button class="fas fa-plus fa-2x no-brdr no-back blink clickable" id="plus${recipe.id}" aria-label="${recipe.name} add to meal plan button"></button>
            </section>
          </section>
        </section>`
    })
    domUpdates.loadRecipeImages();
    domUpdates.fillIconsOnLoad();
  },

  loadRecipeImages() {
    let recipeButtons = document.querySelectorAll('.recipe-images');
    recipeButtons.forEach(button => {
      let matchingID = recipes.find(recipe => recipe.id === parseInt(button.id));
      if (matchingID) {
        button.style.backgroundImage = `url(${matchingID.image})`;
      }
    })
  },

  fillIconsOnLoad() {
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
  },

  displayBigModal(event) {
    domUpdates.removeClass([bigModal, homeButton, favsButton, toggleNeededIngredientsButton], 'hidden');
    domUpdates.addClass([mainDisplay, aside, toggleAllIngredientsButton], 'hidden');
    domUpdates.populateBigModal(event);
  },

  populateBigModal(event) {
    user.selectedRecipe = cookbook.currentRecipes.find(recipe => recipe.id === parseInt(event.target.id));
    bigModalImage.src = user.selectedRecipe.image;
    domUpdates.updateInnerText(bigModalInstructions, user.selectedRecipe.name);
    domUpdates.populateBigModalImageAndText(user.selectedRecipe);
    domUpdates.populateBigModalInstructions(user.selectedRecipe);
    domUpdates.populateBigModalIngredients(user.selectedRecipe);
    domUpdates.updateInnerText(bigModalCost, user.selectedRecipe.getCost(cookbook.ingredients));
  },

  populateBigModalImageAndText(selectedRecipe) {
    bigModalImage.src = selectedRecipe.image;
    domUpdates.updateInnerText(bigModalInstructions, selectedRecipe.name);
    domUpdates.updateInnerText(bigModalCost, selectedRecipe.getCost(cookbook.ingredients));
  },

  populateBigModalInstructions(selectedRecipe) {
    selectedRecipe.instructions.forEach((instruction, i) => {
      bigModalInstructions.innerHTML += `<li class="med-top-marg med-font">${selectedRecipe.getInstructions()[i]}</li>`;
    });
  },

  populateBigModalIngredients(selectedRecipe) {
    bigModalIngredients.innerHTML = '';
    selectedRecipe.ingredients.forEach((ingredient, i) => {
      bigModalIngredients.innerHTML += `<li class="flex align-start text-align med-left-marg med-top-marg med-font"><b>${selectedRecipe.ingredients[i].quantity.amount}</b>x ${selectedRecipe.ingredients[i].quantity.unit} ${selectedRecipe.getIngredientNames(ingredients)[i].join(' ')}</em></li>`;
    });
  },

  clickHomeButton() {
    domUpdates.addClass([homeButton, bigModal, pantryModal], 'hidden');
    domUpdates.removeClass([mainDisplay, favsButton, pantryButton, aside], 'hidden');
    cookbook.clearFilter();
    domUpdates.populateFilterTags(getFilterTags());
    domUpdates.updateMainDisplay();
    domUpdates.hideSearchFunctionality();
  },

  hideSearchFunctionality() {
    if (!pantryButton.classList.contains('hidden')) {
      domUpdates.removeClass([dropDown, searchBar, searchButton], 'hidden');
    } else {
      domUpdates.addClass([dropDown, searchBar, searchButton], 'hidden');
      domUpdates.removeClass([pantryModal], 'hidden');
    }
  },

  clickFilterButton() {
    domUpdates.toggleClass([filterButton], 'orange');
    domUpdates.addClass([mealPlanButton], 'hidden');
    if (sideBarModal.classList.contains('hidden')) {
      domUpdates.removeClass([sideBarModal], 'hidden');
      let tags = getFilterTags();
      domUpdates.populateFilterTags(tags);
      domUpdates.updateInnerText(filterButton, 'Clear Filters');
    } else {
      domUpdates.addClass([sideBarModal], 'hidden');
      domUpdates.removeClass([mealPlanButton], 'hidden');
      favsButton.classList.contains('hidden') ? cookbook.clearFilter(user.favoriteRecipes) : cookbook.clearFilter();
      domUpdates.updateMainDisplay();
      domUpdates.clearCheckBoxes();
    }
  },

  clearCheckBoxes() {
    sideBarModal.innerHTML = '';
    domUpdates.updateInnerText(filterButton, 'Filter');
  },

  populateFilterTags(tags) {
    sideBarModal.innerHTML = '';
    tags.forEach(tag => {
      sideBarModal.innerHTML += `
      <section class="flex column align-start eighty-width sml-marg">
        <section class="flex row">
          <input class="filter no-brdr" type="checkbox" name="${tag}" id="${tag}"/ >
          <label for="${tag}">${tag}</label>
        </section>
      </section>`;
    });
  },

  createUser() {
    domUpdates.updateInnerText(userName, user.name);
  },

  displayFavs() {
    cookbook.currentRecipes = user.favoriteRecipes;
    domUpdates.updateMainDisplay();
    cookbook.tags = [];
    domUpdates.populateFilterTags(getFilterTags());
    domUpdates.addClass([favsButton, bigModal, pantryModal], 'hidden');
    domUpdates.removeClass([homeButton, mainDisplay, aside, pantryButton], 'hidden');
    domUpdates.hideSearchFunctionality();
  },

  displayMealsToCook() {
    sideBarModal.innerHTML = '';
    user.mealPlan.forEach(meal => {
      sideBarModal.innerHTML += `
      <section class="flex column align-start eighty-width sml-marg">
        <section class="flex row">
          <button class="fas fa-times fa-2x sml-right-marg no-back no-brdr blink clickable red" id="delete${meal.id}" aria-label="remove recipe from meal plan button"></button>
          <button class="meals no-brdr no-back blink clickable" id="${meal.id}" aria-label="inspect recipe button">${meal.name}</button>
        </section>
      </section>`;
    });
  },

  populateMealsToCook() {
    domUpdates.toggleClass([mealPlanButton], 'orange');
    domUpdates.addClass([filterButton], 'hidden');
    if (sideBarModal.classList.contains('hidden')) {
      domUpdates.removeClass([sideBarModal], 'hidden');
      domUpdates.displayMealsToCook();
    } else {
      domUpdates.addClass([sideBarModal], 'hidden');
      domUpdates.removeClass([filterButton], 'hidden');
    }
  },

  resetBigModalForPantry() {
   tableBody.innerHTML = '';
  },

  populatePantryDropDown() {
    pantryDropdown.innerHTML = `<option disabled selected hidden>Select an Ingredient</option>`;
    ingredients.sort((a, b) => {
      return a.name.localeCompare(b.name, 'en', {
        ignorePunctuation: true
      })}).forEach(ingredient => {
      pantryDropdown.innerHTML += `
      <option value="${ingredient.id}">${ingredient.name}</option>`;
    });
  },

  displayUserIngredients(tableBody, allIngs) {
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
          <button class="fas fa-minus-circle fa-2x no-brdr no-back blink clickable" id="subtract${ingredient.ingredient}" aria-label="subtract single igredient amount from pantry button"></button>
          <button class="fas fa-plus-circle fa-2x no-brdr no-back blink clickable" id="add${ingredient.ingredient}" aria-label="add single igredient amount from pantry button"></button>
        </td>
      </tr>`;
    });
  },

  populatePantryDisplay() {
    domUpdates.resetBigModalForPantry();
    let allIngredients = cookbook.recipes.flatMap(recipe => recipe.ingredients);
    domUpdates.displayUserIngredients(tableBody, allIngredients);
    domUpdates.populatePantryDropDown();
    domUpdates.addClass([mainDisplay, pantryButton, bigModal, aside], 'hidden');
    domUpdates.removeClass([pantryModal, homeButton, favsButton], 'hidden');
    domUpdates.hideSearchFunctionality();
  },

  resetInputField(element) {
    element.value = '';
  },

  displayYouCanCookMessage() {
    bigModalIngredients.innerHTML = '';
    bigModalIngredients.innerHTML = `<p class="flex align-start text-align med-left-marg med-top-marg med-font">You have all the ingredients you need, let's get cooking!</p>`;
  },

  displayNeededIngredients() {
    let neededIngredients = user.pantry.listNeededIngredients(user.selectedRecipe);
    bigModalIngredients.innerHTML = '';
    neededIngredients.forEach((neededIngredient, i) => {
      let matchingName = ingredients.find(entry => entry.id === neededIngredient.id);
      bigModalIngredients.innerHTML  += `<li class="flex align-start text-align med-left-marg med-top-marg med-font red"><b>${neededIngredient.quantity.amount}</b>x ${neededIngredient.quantity.unit} ${matchingName.name}</em></li>`;
    });
  },

  displaySuccessfullyCookedMealMessage() {
    bigModalIngredients.innerHTML = '';
    bigModalIngredients.innerHTML = `<p class="flex align-start text-align med-left-marg med-top-marg med-font">Your meal has been cooked and the ingredients used have been removed from your pantry.</p>`;
  },
}

// Event Listeners

bigModal.addEventListener('click', async (e) => {
  await determineBigModalEventTarget(e);
});

customAddIngredientButton.addEventListener('click', addCustomIngredientToPantry);

table.addEventListener('click', async (e) => {
  await determinePantryDisplayEventTarget(e);
});

mainDisplay.addEventListener('click', (e) => {
  determineMainDisplayEventTarget(e);
});

sideBarModal.addEventListener('click', (e) => {
  determineSidebarModalEventTarget(e);
});

clearSearch.addEventListener('click', clearSearchBar);

mealPlanButton.addEventListener('click', domUpdates.populateMealsToCook);

favsButton.addEventListener('click', domUpdates.displayFavs);

pantryButton.addEventListener('click', domUpdates.populatePantryDisplay);

filterButton.addEventListener('click', domUpdates.clickFilterButton);

homeButton.addEventListener('click', domUpdates.clickHomeButton);

logoImage.addEventListener('click', () => {
  location.reload();
});

searchButton.addEventListener('click', determineRecipeList);

searchBar.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    determineRecipeList();
  }
});

export {
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
};
