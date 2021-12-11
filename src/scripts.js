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

const logoSection = document.querySelector('#logoSection');
const searchBar = document.querySelector('#searchBar');
const searchButton = document.querySelector('#searchButton');
const homeButton = document.querySelector('#homeButton');
const yourFavsButton = document.querySelector('#yourFavsButton');
const bigModal = document.querySelector('#bigModal');
const mainDisplay = document.querySelector('#mainDisplay');
const filterButton = document.querySelector('#filterButton');
const mealPlanButton = document.querySelector('#mealPlanButton');
const sideBarModal = document.querySelector('#sideBarModal');
const bigModalInstructions = document.querySelector('#bigModalInstructions');
const bigModalImage = document.querySelector('#bigModalImage');
const bigModalCost = document.querySelector('#bigModalCost');
const bigModalHeart = document.querySelector('#bigModalHeart');
const bigModalPlus = document.querySelector('#bigModalPlus');


const ingredients = ingredientData.ingredientsData;
const recipes = recipeData.recipeData.reduce((sum, recipe) => {
  sum.push(new Recipe(recipe));
  return sum
}, []);
const users = userData.usersData;
const cookbook = new Cookbook(ingredients, recipes);


// helper functions

const updateInnerText = (element, update) => {
  element.innerText = update;
}

const removeClass = (elements, rule) => {
  elements.forEach(item => item.classList.remove(rule));
}

const addClass = (elements, rule) => {
  elements.forEach(item => item.classList.add(rule));
}

const displayCurrentRecipes = () => {
  let display = cookbook.currentRecipes;
  mainDisplay.innerHTML = '';
  display.forEach(recipe => {
    mainDisplay.innerHTML +=
    `<article class="flex column sml-brdr-radius shadow ${recipe.id}" id="${recipe.id}">
          <img class="full-width half-height" src=${recipe.image}>
          <div class="flex row around full-width half-height yellow">
            <p class="full-width text-cntr line">${recipe.name}</p>
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

const clickFilterButton = () => {
  if (sideBarModal.classList.contains('hidden')) {
    removeClass([sideBarModal], 'hidden');
    let tags = getFilterTags();
    populateFilterTags(tags);
    createFilterEventListener();
  } else {
    addClass([sideBarModal], 'hidden');
  }
}

const populateFilterTags = (tags) => {
  sideBarModal.innerHTML = ''
  tags.forEach(tag => {
    sideBarModal.innerHTML += 
    `<section class="flex column align-start eighty-width sml-marg">
    <section class="flex row">
      <input class="filter" type="checkbox" name="${tag}" id ="${tag}" />
      <label for="${tag}">${tag}</label>
    </section>
  </section>`
  });
}

const getFilterTags = () => {
  return cookbook.currentRecipes.reduce((accumulator, recipe) => {
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
  const recipeCards = document.querySelectorAll('article');
  recipeCards.forEach(recipeCard => {
    recipeCard.addEventListener('click', (event) => {
      displayBigModal(event);
      console.log(event.target.id);
    });
  });
}

const displayBigModal = (event) => {
  removeClass([bigModal], 'hidden');
  addClass([mainDisplay], 'hidden');
  populateBigModal(event);
}

const populateBigModal = (event) => {
  let selectedRecipe = cookbook.currentRecipes.find(recipe => recipe.id === parseInt(event.target.parentNode.id));
  bigModalImage.src = selectedRecipe.image;
  updateInnerText(bigModalInstructions, selectedRecipe.name);
  selectedRecipe.instructions.forEach((instruction, i) => {
    bigModalInstructions.innerHTML += `<li>${selectedRecipe.getInstructions()[i]}</li>`;
  });
  updateInnerText(bigModalCost, selectedRecipe.getCost(cookbook.ingredients));
}



//event listeners

window.addEventListener('load', displayCurrentRecipes);

filterButton.addEventListener('click', clickFilterButton);



// sideBarModal.addEventListener('change', )