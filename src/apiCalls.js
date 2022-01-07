const recipeCalls =
  fetch('http://localhost:3001/api/v1/recipes')
    .then(response => response.json());

const ingredientCalls =
  fetch('http://localhost:3001/api/v1/ingredients')
    .then(response => response.json());

const userCalls =
  fetch('http://localhost:3001/api/v1/users')
    .then(response => response.json());

const pantryCalls = (ing, amt) => {
  fetch('http://localhost:3001/api/v1/users', {
    method: 'POST',
    body: JSON.stringify({
      "userID": user.id,
      "ingredientID": ing.id,
      "ingredientModification": amt
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => checkForError(response));
}


module.exports = {recipeCalls, ingredientCalls, userCalls, pantryCalls};
