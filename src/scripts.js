import './styles.css';
import apiCalls from './apiCalls';
import Cookbook from '../src/classes/Cookbook';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';
import Ingredient from '../src/classes/Ingredient';
import userData from './data/users';
import recipeData from './data/recipes';
import ingredientData from './data/ingredients';

const ingredients = ingredientData.ingredientsData;
const recipes = recipeData.recipeData;
const users = userData.usersData; 

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
