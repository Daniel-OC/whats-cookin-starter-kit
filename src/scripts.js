import './styles.css';
import apiCalls from './apiCalls';
import Cookbook from '../src/classes/Cookbook';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';
import Ingredient from '../src/classes/Ingredient';
import userData from './data/users';
import recipeData from './data/recipes';
import ingredientData from './data/ingredients';
import './images/cookin_pan_icon.png';

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
const bigModalHeart = document.querySelector('#bigModalHeart');
const bigModalPlus = document.querySelector('#bigModalPlus');


const ingredients = ingredientData.ingredientsData;
const recipes = recipeData.recipeData.reduce((sum, recipe) => {
  sum.push(new Recipe(recipe));
  return sum;
}, []);
const users = userData.usersData;
const cookbook = new Cookbook(ingredients, recipes);
const user = new User(users[getRandomIndex(users)]);

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
    mainDisplay.innerHTML +=`
    <article class="flex column sml-brdr-radius shadow clickable">
      <img class="full-width half-height recipe-image" id="${recipe.id}" src=${recipe.image}>
      <div class="flex row around full-width half-height yellow">
        <p class="full-width text-cntr line not-clickable">${recipe.name}</p>
        <div class="flex column around basis half-width full-height">
					<div class="flex column">
						<i class="far fa-heart fa-2x fa-cog-heart clickable" id="heart${recipe.id}"></i>
					</div>
					<div class="flex column">
						<i class="fas fa-plus fa-2x clickable" id="plus${recipe.id}"></i>
					</div>
        </div>
      </div>
    </article>`;
  });
  createRecipeCardEventListener();
}

const clickHomeButton = () => {
  addClass([homeButton, bigModal], 'hidden');
  removeClass([mainDisplay, favsButton], 'hidden');
  cookbook.currentRecipes = cookbook.recipes;
  displayCurrentRecipes();
}

const clickFilterButton = () => {
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
  sideBarModal.innerHTML = ''
  tags.forEach(tag => {
    sideBarModal.innerHTML +=`
    <section class="flex column align-start eighty-width sml-marg">
      <section class="flex row">
        <input class="filter" type="checkbox" name="${tag}" id ="${tag}" />
        <label for="${tag}">${tag}</label>
      </section>
    </section>`
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
      displayByTag(event.target.id);
    });
  });
}

const displayByTag = (tag) => {
  if (!cookbook.tags.includes(tag)) {
    cookbook.tags.push(tag);
  } else {
    cookbook.tags.splice(cookbook.tags.indexOf(tag), 1);
  }
  cookbook.filterByTag(cookbook.tags);
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
      let selectedRecipe = cookbook.recipes.find(recipe => `heart${recipe.id}` === event.target.id)
      if (!user.favoriteRecipes.includes(selectedRecipe)) {
        addClass([event.target], 'fas');
        user.addFavoriteRecipe(selectedRecipe);
      } else {
        removeClass([event.target], 'fas');
        user.removeFavoriteRecipe(selectedRecipe);
        displayCurrentRecipes();
      }
    });
  });
}

const createRecipePlusListener = () => {
  const recipePluses = document.querySelectorAll('.fa-plus');
  recipePluses.forEach(plus => {
    plus.addEventListener('click', (event) => {
      let selectedRecipe = cookbook.recipes.find(recipe => `plus${recipe.id}` === event.target.id);
      if (!user.mealPlan.includes(selectedRecipe)) {
        user.addToMealPlan(selectedRecipe);
      } else {
        user.removeFromMealPlan(selectedRecipe);
      }
    });
  });
}

const displayBigModal = (event) => {
  removeClass([bigModal, homeButton], 'hidden');
  addClass([mainDisplay], 'hidden');
  populateBigModal(event);
}

const populateBigModal = (event) => {
  let selectedRecipe = cookbook.currentRecipes.find(recipe => recipe.id === parseInt(event.target.id));
  bigModalImage.src = selectedRecipe.image;
  updateInnerText(bigModalInstructions, selectedRecipe.name);
  selectedRecipe.instructions.forEach((instruction, i) => {
    bigModalInstructions.innerHTML += `<li>${selectedRecipe.getInstructions()[i]}</li>`;
  });
  updateInnerText(bigModalCost, selectedRecipe.getCost(cookbook.ingredients));
}

const searchForRecipe = () => {
  let search = searchBar.value.toLowerCase();
  cookbook.keywords = search.split(' ');
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
  addClass([favsButton], 'hidden');
  removeClass([homeButton], 'hidden');
}

//event listeners

favsButton.addEventListener('click', displayFavs);

window.addEventListener('load', startSite);

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