import recipes from './recipes.js'

const ingredientsList = []
const appliancesList = []
const utensilsList = []

recipes.forEach(recipe => {
  recipe.ingredients.forEach(ingredient => {
    if (!ingredientsList.includes(ingredient.ingredient.toLowerCase())) {
      ingredientsList.push(ingredient.ingredient.toLowerCase())
    }
  })

  if (!appliancesList.includes(recipe.appliance.toLowerCase())) {
    appliancesList.push(recipe.appliance.toLowerCase())
  }

  recipe.ustensils.forEach(utensil => {
    if (!utensilsList.includes(utensil.toLowerCase())) {
      utensilsList.push(utensil.toLowerCase())
    }
  })
})

function fillSelectOptionsWithFilter (selectId, optionsList, searchInputId) {
  const selectElement = document.getElementById(selectId)
  const searchInputElement = document.getElementById(searchInputId)

  searchInputElement.addEventListener('input', () => {
    const searchTerm = searchInputElement.value.toLowerCase()

    selectElement.innerHTML = ''

    optionsList.forEach(option => {
      if (option.toLowerCase().includes(searchTerm)) {
        const optionElement = document.createElement('option')
        optionElement.value = option
        optionElement.textContent = option
        selectElement.appendChild(optionElement)
      }
    })
  })

  // Remplir les options initiales
  optionsList.forEach(option => {
    const optionElement = document.createElement('option')
    optionElement.value = option
    optionElement.textContent = option
    selectElement.appendChild(optionElement)
  })
}
export { fillSelectOptionsWithFilter, ingredientsList, appliancesList, utensilsList }
