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

    const contentDiv = document.createElement('div')
    contentDiv.classList.add('c_content')
    recetteDiv.appendChild(contentDiv)

    const nomElt = document.createElement('h3')
    nomElt.textContent = r.name
    contentDiv.appendChild(nomElt)

    const titleRecipe = document.createElement('span')
    titleRecipe.textContent = 'RECETTE'
    contentDiv.appendChild(titleRecipe)

    const descElt = document.createElement('p')
    descElt.textContent = r.description
    contentDiv.appendChild(descElt)

    const ingreDiv = document.createElement('div')
    ingreDiv.classList.add('c_ingredients')
    recetteDiv.appendChild(ingreDiv)

    const titleIngre = document.createElement('span')
    titleIngre.textContent = 'INGRÉDIENTS'
    ingreDiv.appendChild(titleIngre)

    r.ingredients.forEach(ingredient => {
      const ingrDiv = document.createElement('div')
      ingreDiv.appendChild(ingrDiv)
      const ingrElt1 = document.createElement('span')
      const ingrElt2 = document.createElement('span')
      ingrElt1.textContent = `${ingredient.ingredient}`
      ingrElt2.textContent = `${ingredient.quantity || ''} ${ingredient.unit || ''}`
      ingrDiv.appendChild(ingrElt1)
      ingrDiv.appendChild(ingrElt2)
    })

    containerRecipes.appendChild(recetteDiv)
  })
}

export default displayRecipes
