import recipes from './recipes.js'

function displayRecipes () {
  const containerRecipes = document.getElementById('RecipesContainer')
  recipes.forEach(recette => {
    const recetteDiv = document.createElement('div')
    recetteDiv.classList.add('cards')

    const imageElement = document.createElement('img')
    imageElement.src = `../assets/img/${recette.image}`
    imageElement.alt = recette.name
    imageElement.style.width = '100px'
    recetteDiv.appendChild(imageElement)

    const nomElement = document.createElement('h3')
    nomElement.textContent = recette.name
    recetteDiv.appendChild(nomElement)

    containerRecipes.appendChild(recetteDiv)
  })
}

export default displayRecipes
