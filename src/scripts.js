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

const ingredients = ingredientData.ingredientsData;
const recipes = recipeData.recipeData.reduce((sum, recipe) => {
  sum.push(new Recipe(recipe));
  return sum
},[]);
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

const displayCurrentRecipes = (currentRecipes) => {
  let display = currentRecipes;
  mainDisplay.innerHTML = '';
  display.forEach(recipe => {
    mainDisplay.innerHTML +=
    `<article class="flex column sml-brdr-radius shadow">
          <img class="full-width half-height" src=${recipe.image}>
          <div class="flex row around full-width half-height yellow">
            <p class="full-width text-cntr line">${recipe.name}</p>
            <div class="flex column around basis half-width full-height">
							<div class="flex column">
								<i class="far fa-heart fa-2x fa-cog-heart clickable" id="heartUnclicked${recipe.id}"></i>
                <i class="fas fa-heart fa-2x fa-cog-heart-filled clickable hidden" id="heartClicked${recipe.id}"></i>
							</div>
							<div class="flex column">
								<i class="fas fa-plus fa-2x fa-cog-plus clickable" id="plusUnclicked${recipe.id}"></i>
                <i class="fas fa-plus fa-2x fa-cog-plus-filled clickable hidden" id="plusClicked${recipe.id}"></i>
							</div>
            </div>
          </div>
        </article>`;
  }); 
} 

const clickFilterButton = () => {
  if (sideBarModal.classList.contains('hidden')) {
    removeClass([sideBarModal], 'hidden')
  } else {
    addClass([sideBarModal], 'hidden')
  }
}



//event listeners

window.addEventListener('load', () => {
  displayCurrentRecipes(cookbook.currentRecipes)
})

filterButton.addEventListener('click', clickFilterButton)