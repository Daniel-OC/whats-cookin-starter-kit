
const recipeCalls =
  fetch('http://localhost:3001/api/v1/recipes')
    .then(response => response.json());

const ingredientCalls =
  fetch('http://localhost:3001/api/v1/ingredients')
    .then(response => response.json());

const userCalls =
  fetch('http://localhost:3001/api/v1/users')
    .then(response => response.json());

const pantryCalls = (user, ing, amt) => {
  return fetch('http://localhost:3001/api/v1/users', {
    method: 'POST',
    body: JSON.stringify({
      userID: parseInt(user.id),
      ingredientID: parseInt(ing),
      ingredientModification: parseInt(amt)
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}



module.exports = {recipeCalls, ingredientCalls, userCalls, pantryCalls};
