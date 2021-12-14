import './styles.css';
import {recipeCalls, ingredientCalls, userCalls} from './apiCalls';
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
const filterButton = document.querySelector('#filterButton');
const mealPlanButton = document.querySelector('#mealPlanButton');
const sideBarModal = document.querySelector('#sideBarModal');
const mainDisplay = document.querySelector('#mainDisplay');
const bigModal = document.querySelector('#bigModal');
const bigModalInstructions = document.querySelector('#bigModalInstructions');
const bigModalImage = document.querySelector('#bigModalImage');
const bigModalCost = document.querySelector('#bigModalCost');
const aside = document.querySelector('#aside');

let cookbook;
let user;

Promise.all([recipeCalls, ingredientCalls, userCalls])
  .then(data => {
    const recipes = data[0].recipeData.reduce((sum, recipe) => {
      sum.push(new Recipe(recipe));
      return sum;
    }, []);
    cookbook = new Cookbook(data[1].ingredientsData, recipes);
    user = new User(data[2].usersData[getRandomIndex(data[2].usersData)]);
    startSite();
  }).catch(error => console.log(error));

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

const displayCurrentRecipes = () => {
  let display = cookbook.currentRecipes;
  mainDisplay.innerHTML = '';
  display.forEach(recipe => {
    if (user.favoriteRecipes.includes(recipe) && user.mealPlan.includes(recipe)) {
      mainDisplay.innerHTML += `
    <article class="flex column sml-brdr-radius shadow">
      <img class="full-width half-height recipe-image clickable" id="${recipe.id}" src=${recipe.image} alt="${recipe.name} smaller meal image">
      <div class="flex row around full-width half-height yellow">
        <p class="full-width not-clickable">${recipe.name}</p>
        <div class="flex column around basis half-width full-height">
					<div class="flex column">
						<i class="far fa-heart fa-2x red clickable fas" id="heart${recipe.id}"></i>
					</div>
					<div class="flex column">
						<i class="fas fa-plus fa-2x clickable plus" id="plus${recipe.id}"></i>
					</div>
        </div>
      </div>
    </article>`;
    } else if (user.favoriteRecipes.includes(recipe) && !user.mealPlan.includes(recipe)) {
      mainDisplay.innerHTML += `
    <article class="flex column sml-brdr-radius shadow">
      <img class="full-width half-height recipe-image clickable" id="${recipe.id}" src=${recipe.image} alt="${recipe.name} smaller meal image">
      <div class="flex row around full-width half-height yellow">
        <p class="full-width not-clickable">${recipe.name}</p>
        <div class="flex column around basis half-width full-height">
					<div class="flex column">
						<i class="far fa-heart fa-2x red clickable fas" id="heart${recipe.id}"></i>
					</div>
					<div class="flex column">
						<i class="fas fa-plus fa-2x clickable" id="plus${recipe.id}"></i>
					</div>
        </div>
      </div>
    </article>`;
    } else if (!user.favoriteRecipes.includes(recipe) && user.mealPlan.includes(recipe)) {
      mainDisplay.innerHTML += `
        <article class="flex column sml-brdr-radius shadow">
          <img class="full-width half-height recipe-image clickable" id="${recipe.id}" src=${recipe.image} alt="${recipe.name} smaller meal image">
          <div class="flex row around full-width half-height yellow">
            <p class="full-width not-clickable">${recipe.name}</p>
            <div class="flex column around basis half-width full-height">
              <div class="flex column">
                <i class="far fa-heart fa-2x red clickable" id="heart${recipe.id}"></i>
              </div>
              <div class="flex column">
                <i class="fas fa-plus fa-2x clickable plus" id="plus${recipe.id}"></i>
              </div>
            </div>
          </div>
        </article>`
    } else if (!user.favoriteRecipes.includes(recipe) && !user.mealPlan.includes(recipe)) {
      mainDisplay.innerHTML += `
        <article class="flex column sml-brdr-radius shadow">
          <img class="full-width half-height recipe-image clickable" id="${recipe.id}" src=${recipe.image} alt="${recipe.name} smaller meal image">
          <div class="flex row around full-width half-height yellow">
            <p class="full-width not-clickable">${recipe.name}</p>
            <div class="flex column around basis half-width full-height">
              <div class="flex column">
                <i class="far fa-heart fa-2x red clickable" id="heart${recipe.id}"></i>
              </div>
              <div class="flex column">
                <i class="fas fa-plus fa-2x clickable" id="plus${recipe.id}"></i>
              </div>
            </div>
          </div>
        </article>`
    }
  });
  createRecipeCardEventListener();
}

const clickHomeButton = () => {
  addClass([homeButton, bigModal], 'hidden');
  removeClass([mainDisplay, favsButton, aside], 'hidden');
  cookbook.currentRecipes = cookbook.recipes;
  displayCurrentRecipes();
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
    createFilterEventListener();
    updateInnerText(filterButton, 'Clear Filters');
  } else {
    addClass([sideBarModal], 'hidden');
    removeClass([filterButton], 'orange');
    cookbook.currentRecipes = user.favoriteRecipes;
    displayCurrentRecipes();
    clearCheckBoxes();
  }
}

const clickFilterHomeView = () => {
  if (sideBarModal.classList.contains('hidden')) {
    addClass([filterButton], 'orange');
    removeClass([sideBarModal], 'hidden');
    let tags = getFilterTags();
    populateFilterTags(tags);
    createFilterEventListener();
    updateInnerText(filterButton, 'Clear Filters');
  } else {
    addClass([sideBarModal], 'hidden');
    removeClass([filterButton], 'orange');
    cookbook.clearFilter();
    displayCurrentRecipes();
    clearCheckBoxes();
  }
}

const clearCheckBoxes = () => {
  sideBarModal.innerHTML = '';
  updateInnerText(filterButton, 'Filter');
}

const populateFilterTags = (tags) => {
  sideBarModal.innerHTML = '';
  tags.forEach(tag => {
    if (cookbook.tags.includes(tag)) {
      sideBarModal.innerHTML += `
    <section class="flex column align-start eighty-width sml-marg">
      <section class="flex row">
        <input class="filter" type="checkbox" checked name="${tag}" id="${tag}"/ >
        <label for="${tag}">${tag}</label>
      </section>
    </section>`;
    } else {
      sideBarModal.innerHTML += `
      <section class="flex column align-start eighty-width sml-marg">
        <section class="flex row">
          <input class="filter" type="checkbox" name="${tag}" id ="${tag}" />
          <label for="${tag}">${tag}</label>
        </section>
      </section>`;
    }
  });
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

const createFilterEventListener = () => {
  const checkBoxes = document.querySelectorAll('.filter');
  checkBoxes.forEach(checkBox => {
    checkBox.addEventListener('click', (event) => {
      displayByTag(event.target.id, cookbook);
    });
  });
}

const displayByTag = (tag, cookbook) => {
  if (favsButton.classList.contains('hidden')) {
    displayFavsByTag(tag, cookbook);
  } else {
    displayAllByTag(tag);
  }
}

const displayFavsByTag = (tag, cookbook) => {
  if (!cookbook.tags.includes(tag)) {
    cookbook.tags.push(tag);
    user.filterFavoritesByTag(cookbook.tags, cookbook);
  } else if (cookbook.tags.includes(tag) && cookbook.tags.length > 1) {
    cookbook.tags.splice(cookbook.tags.indexOf(tag), 1);
    user.filterFavoritesByTag(cookbook.tags, cookbook);
  } else if (cookbook.tags.includes(tag) && cookbook.tags.length === 1) {
    cookbook.tags.splice(cookbook.tags.indexOf(tag), 1);
    cookbook.currentRecipes = user.favoriteRecipes;
  }
  displayCurrentRecipes();
}

const displayAllByTag = (tag) => {
  if (!cookbook.tags.includes(tag)) {
    cookbook.tags.push(tag);
    cookbook.filterByTag(cookbook.tags);
  } else if (cookbook.tags.includes(tag) && cookbook.tags.length > 1) {
    cookbook.tags.splice(cookbook.tags.indexOf(tag), 1);
    cookbook.filterByTag(cookbook.tags);
  } else if (cookbook.tags.includes(tag) && cookbook.tags.length === 1) {
    cookbook.clearFilter();
  }
  displayCurrentRecipes();
}

const createRecipeCardEventListener = () => {
  createWholeCardListener();
  createRecipeHeartListener();
  createRecipePlusListener();
}

const createWholeCardListener = () => {
  const recipeCards = document.querySelectorAll('.recipe-image');
  recipeCards.forEach(recipeCard => {
    recipeCard.addEventListener('click', (event) => {
      displayBigModal(event);
    });
  });
}

const createRecipeHeartListener = () => {
  const recipeHearts = document.querySelectorAll('.fa-heart');
  recipeHearts.forEach(heart => {
    heart.addEventListener('click', (event) => {
      let selectedRecipe = cookbook.recipes.find(recipe => `heart${recipe.id}` === event.target.id);
      toggleFavoriteRecipe(selectedRecipe);
    });
  });
}

const toggleFavoriteRecipe = (selectedRecipe) => {
  if (!user.favoriteRecipes.includes(selectedRecipe)) {
    addClass([event.target], 'fas');
    user.addFavoriteRecipe(selectedRecipe);
  } else {
    removeClass([event.target], 'fas');
    user.removeFavoriteRecipe(selectedRecipe);
    displayCurrentRecipes();
  }
}

const createRecipePlusListener = () => {
  const recipePluses = document.querySelectorAll('.fa-plus');
  recipePluses.forEach(plus => {
    plus.addEventListener('click', (event) => {
      let selectedRecipe = cookbook.recipes.find(recipe => `plus${recipe.id}` === event.target.id);
      toggleMealPlan(selectedRecipe);
    });
  });
}

const toggleMealPlan = (selectedRecipe) => {
  if (!user.mealPlan.includes(selectedRecipe)) {
    addClass([event.target], 'plus')
    user.addToMealPlan(selectedRecipe);
  } else {
    removeClass([event.target], 'plus')
    user.removeFromMealPlan(selectedRecipe);
  }
  displayMealsToCook();
}

const displayBigModal = (event) => {
  removeClass([bigModal, homeButton, favsButton], 'hidden');
  addClass([mainDisplay, aside], 'hidden');
  populateBigModal(event);
}

const populateBigModal = (event) => {
  let selectedRecipe = cookbook.currentRecipes.find(recipe => recipe.id === parseInt(event.target.id));
  bigModalImage.src = selectedRecipe.image;
  updateInnerText(bigModalInstructions, selectedRecipe.name);
  selectedRecipe.instructions.forEach((instruction, i) => {
    bigModalInstructions.innerHTML += `<li class="med-top-marg med-font">${selectedRecipe.getInstructions()[i]}</li>`;
  });
  updateInnerText(bigModalCost, selectedRecipe.getCost(cookbook.ingredients));
}

const searchForRecipe = () => {
  removeClass([clearSearch], 'hidden')
  if (homeButton.classList.contains('hidden')) {
    searchForRecipeHome();
  } else {
    searchForRecipeFavs(cookbook);
  }
}

const searchForRecipeHome = () => {
  let search = searchBar.value.toLowerCase();
  cookbook.addKeywords(search.split(' '));
  if (dropDown.value === 'name' && searchBar.value) {
    cookbook.filterByRecipeName();
    displayCurrentRecipes();
  } else if (dropDown.value === 'ingredient' && searchBar.value) {
    cookbook.filterByIngredient();
    displayCurrentRecipes();
  } else if (!dropDown.value || !searchBar.value) {
    mainDisplay.innerText = "Please select a category or search term!";
  }
  cookbook.clearFilter();
}

const searchForRecipeFavs = (cookbook) => {
  let search = searchBar.value.toLowerCase();
  cookbook.addKeywords(search.split(' '));
  if (dropDown.value === 'name' && searchBar.value) {
    user.filterFavoritesByRecipeName(cookbook);
    displayCurrentRecipes();
  } else if (dropDown.value === 'ingredient' && searchBar.value) {
    user.filterFavoritesByIngredient(cookbook);
    displayCurrentRecipes();
  } else if (!dropDown.value || !searchBar.value) {
    mainDisplay.innerText = "Please select a category or search term!";
  }
}

const createUser = () => {
  userName.innerText = user.name;
}

const startSite = () => {
  displayCurrentRecipes();
  createUser();
}

const displayFavs = () => {
  cookbook.currentRecipes = user.favoriteRecipes;
  displayCurrentRecipes();
  addClass([favsButton, bigModal], 'hidden');
  removeClass([homeButton, mainDisplay, aside], 'hidden');
}

const displayMealsToCook = () => {
  sideBarModal.innerHTML = '';
  user.mealPlan.forEach(meal => {
    sideBarModal.innerHTML += `
    <section class="flex column align-start eighty-width sml-marg">
      <section class="flex row">
        <i class="fas fa-times fa-2x sml-right-marg clickable red" id="delete${meal.id}"></i>
        <p id="${meal.id}">${meal.name}</p>
      </section>
    </section>`;
  });
  createMealPlanDeleteListener();
}

const createMealPlanDeleteListener = () => {
  const mealDeletes = document.querySelectorAll('.fa-times');
  mealDeletes.forEach(meal => {
    meal.addEventListener('click', (event) => {
      let selectedMeal = user.mealPlan.find(meal => `delete${meal.id}` === event.target.id);
      user.removeFromMealPlan(selectedMeal);
      displayMealsToCook();
      displayCurrentRecipes();
    });
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
    cookbook.currentRecipes = user.favoriteRecipes
  };
  searchBar.value = null;
  addClass([clearSearch], 'hidden');
  displayCurrentRecipes();
  };
  

//event listeners

clearSearch.addEventListener('click', clearSearchBar);

mealPlanButton.addEventListener('click', populateMealsToCook);

favsButton.addEventListener('click', displayFavs);

filterButton.addEventListener('click', clickFilterButton);

homeButton.addEventListener('click', clickHomeButton);

logoImage.addEventListener('click', () => {
  location.reload();
});

searchButton.addEventListener('click', searchForRecipe);

searchBar.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchForRecipe();
  }
});
