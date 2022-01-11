# MOD2 What's Cookin, Good Lookin'?

## TABLE OF CONTENTS
- [Project Overview](#project-overview)
- [Future Features](#future-features)
- [Tech Stack](#technologies-used)
- [Install Instructions](#instructions)
- [Authors/Links](#authorslinks)

### Project Overview

Turing's Mod 2 "What's Cookin" group project continued to build on on class-to-class interaction, Test-Driven Development, and the freshly taught ES6 syntax and iterator methods, while introducing new technologies like webpack and and GET network requests. The [spec](https://frontend.turing.edu/projects/whats-cookin-part-one.html) asked us to start with some very real-world steps such as creating a project board with wireframes, laying out our goals, detailing the steps of how we'd achieve those, and truly thinking big picture. Over the course of 10 days, our group of **three** developers designed a site that pulled its data using Fetch API, and allows the user to filter through a database of recipes, store their favorites or upcoming meals-to-cook, and select recipes to their specific details such as instructions and total cost. 

![](https://media.giphy.com/media/TxJL6ay7GAHKnXIsH3/giphy.gif)

On page load, the user will be able to scroll through a database of potential recipes.

![](https://media.giphy.com/media/3fdireDamtCOX3JYnj/giphy.gif)

If the user would like to learn more about the recipe, such as instructions for cooking it or the total cost of all the ingredients involved, simply click on a small card to see a larger display.

![](https://media.giphy.com/media/YrUU1bToSi4Y3TszV0/giphy.gif)

If the user sees a recipe they like, they may favorite that recipe by clicking the heart. A filled in heart indicates the recipe has been favorited.

![](https://media.giphy.com/media/fSaNaY81D0g2DgcVMW/giphy.gif)

If the user decides they no longer love the recipe, they can "un-heart" it and they will no longer see the recipe in their fav view. The recipe can also be removed from the faved view.

![](https://media.giphy.com/media/FlSlD76305vOiqkqke/giphy.gif)

If the user sees a recipe they'd like to cook for later, they may store it by clicking the plus. If they want to view their meals stored to cook later, they may click the "Meal Plan" button on the right of the screen. If they cook that meal or decide they don't want it after all, simply click the red X. 

![](https://media.giphy.com/media/2aOSXQvdaIgYELOihI/giphy.gif)

The user may select the Filter Button to display all the available tags to filter the recipes by. The filtering is set to be more inclusive, so any checkbox that is displayed will show recipes that include that particular tag. They may work back towards the whole database by unchecking boxes OR reclicking the Filter button that now says "Clear Filters".

![](https://media.giphy.com/media/qsnVxH7cCAi7o13rHP/giphy.gif)

The user may also use the search bar to filter through all potential recipes by ingredient name. In the example above, the user filters by eggs, then eggs AND salt, then eggs AND salt AND chicken to finally display one single recipe requring all 3 pieces.

![](https://media.giphy.com/media/8sXVYIRjJjxdigxjQm/giphy.gif)

![](https://media.giphy.com/media/IPeYrEPRmqKO9S3tEA/giphy.gif)

The filtering tags will also work within the user's favorited recipes section, as does the search by Recipe Name or ingredients in the search bar.

As of January 2022, the user now has a "Pantry", in which they can keep track of the ingredients they have at home, adding and removing them, either with simple incrementer buttons or with a custom "add ingredient" section.

![](https://media.giphy.com/media/tbeA70UcS5lfr0Da1s/giphy.gif)

![](https://media.giphy.com/media/xdkWxbwTE6NQjzVxBt/giphy.gif)

![](https://media.giphy.com/media/yOGqbI7VwcvdcCIjCW/giphy.gif)

The new pantry function also allows a user to check if they have the ingredients necessary to create  a meal. After clicking on a recipe, while in the single recipe display, they have the option of pressing a button to determine if they have the necessary ingredients. If not, the list of ingredients will update with a list of ingredients they still require.

![](https://media.giphy.com/media/Tuap8o7nQS5EPEf4PW/giphy.gif)

If the user has the necessary ingredients, the ingredients will be replaced with a message informing them as such. They will also have the option of selecting "Cook this Meal", which will consider the meal "cooked", and remove the requisite ingredients from their pantry.

![](https://media.giphy.com/media/t1wCI2pbTRa9lgiygA/giphy.gif)


### FUTURE FEATURES
- Provide a better UX by updating the UI

### TECHNOLOGIES USED 
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![SASS](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Mocha](https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=Mocha&logoColor=white)
![Chai](https://img.shields.io/badge/chai-A30701?style=for-the-badge&logo=chai&logoColor=white)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white
)

![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

![Atom](https://img.shields.io/badge/Atom-%2366595C.svg?style=for-the-badge&logo=atom&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

### INSTRUCTIONS
- fork the repository
- copy the SSH clone address
- run ```git clone [remote-address]``` in your repo
- run ```npm install``` in your terminal
- run ```npm start``` in the Terminal visit localhost:8080

- now fork and clone the APIs that the site will be drawing it's data and Pantry functonality from: (https://github.com/Daniel-OC/whats-cookin-api)
- run ```npm install``` in your terminal
- run ```npm start``` in the Terminal

### AUTHORS/LINKS
#### - Project
   - [Project Board]()
#### - AUTHORS:
   - Daniel O'Connell = [LinkedIn](https://www.linkedin.com/in/daniel-o-connell-a66371224/) || [GitHub](https://github.com/Daniel-OC)
   - Ethan Tweittman = [LinkedIn](https://www.linkedin.com/in/ethantweitmann/) || [GitHub](https://github.com/ectweitmann)
   - Alex Fritz = [LinkedIn](https://www.linkedin.com/in/alexmfritz/) || [GitHub](https://github.com/alexmfritz)
#### - Education:
   - Hannah Hudson (Project Manager) = [LinkedIn](https://www.linkedin.com/in/hannahchudson/) || [GitHub](https://github.com/hannahhch)
   - [Turing School of Software & Design](https://turing.edu/)


## [BACK TO THE TOP!](#mod2-whats-cookin-good-lookin)

