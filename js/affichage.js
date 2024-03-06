import recipes from './recipes.js'

function displayRecipes () {
  const containerRecipes = document.getElementById('RecipesContainer')
  recipes.forEach(r => {
    const recetteDiv = document.createElement('div')
    recetteDiv.classList.add('c_cards')

    const imgElt = document.createElement('img')
    imgElt.src = `../assets/img/${r.image}`
    imgElt.alt = r.name
    imgElt.classList.add('c_img')
    recetteDiv.appendChild(imgElt)

    const nomElt = document.createElement('h3')
    nomElt.textContent = r.name
    recetteDiv.appendChild(nomElt)

    const descElt = document.createElement('p')
    descElt.textContent = r.description
    recetteDiv.appendChild(descElt)

    r.ingredients.forEach(ingredient => {
      const ingrElt = document.createElement('span')
      ingrElt.textContent = `${ingredient.quantity || ''} ${ingredient.unit || ''} ${ingredient.ingredient}`
      recetteDiv.appendChild(ingrElt)
    })

    containerRecipes.appendChild(recetteDiv)
  })
}

export default displayRecipes
