// Afficher toutes les recettes grâce au json
// Afficher les options des filtres dans les select (Utiliser le proxy dans filterSelect.js)
// Pouvoir rechercher dans les filtres (Commencer la racherche par appliance puis ustenils et ingrédients)
// Une fois le tag choisis afficher les résultats voulus, pouvoir le supprimer
// Revoir les select une fois un tag choisi en fonction des correspondances
// Recherche principal, faire les 2 méthodes
// Actualiser le total de recette
// Utiliser le proxy pour rendre les éléments

// Plutot utiliser des composants réutilisables dans affichage.js

import displayRecipes from './affichage.js'
import recipes from './recipes.js'
import { fillOptionsWithFilter, ingredientsList, appliancesList, utensilsList } from './filterSelect.js'

const selectedFilters = {
  ingredients: [],
  appliances: [],
  utensils: []
}

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

fillOptionsWithFilter('Ingredients', ingredientsList, 'IngredientsList')
fillOptionsWithFilter('Appareils', appliancesList, 'AppareilsList')
fillOptionsWithFilter('Ustensiles', utensilsList, 'UstensilesList')

displayRecipes(recipes)
addFilterTag('selectedTagName')

document.querySelector('#IngredientsList').addEventListener('change', (e) => {
  const selectedIngredient = e.target.value.toLowerCase()
  const recipesWithSelectedIngredient = recipes.filter(recipe =>
    recipe.ingredients.some(ingredient =>
      ingredient.ingredient.toLowerCase() === selectedIngredient
    )
  )

  if (recipesWithSelectedIngredient.length > 0) {
    selectedFilters.ingredients = [selectedIngredient]
    updateDisplayedRecipes()
    addFilterTag('ingredients', selectedIngredient)
    removeOptionFromList('IngredientsList', selectedIngredient)
  } else {
    alert(`Aucune recette ne contient l'ingrédient "${selectedIngredient}".`)
  }
})

function addOptionToList (selectId, optionValue) {
  const selectorElement = document.getElementById(selectId)
  const optionElement = document.createElement('option')
  optionElement.value = optionValue
  optionElement.textContent = optionValue
  selectorElement.appendChild(optionElement)
}

function removeOptionFromList (selectId, optionValue) {
  const selectorElement = document.getElementById(selectId)
  if (selectorElement && selectorElement.options) {
    const optionToRemove = Array.from(selectorElement.options).find(option => option.value.toLowerCase() === optionValue)
    if (optionToRemove) {
      optionToRemove.remove()
    }
  }
}

// Ajouter le tag au click sur le site
function addFilterTag (filterType, filterValue) {
  const filterTagsContainer = document.getElementById('filterTags')
  const tagElement = document.createElement('div')
  tagElement.textContent = filterValue
  tagElement.classList.add('filter-tag')
  tagElement.addEventListener('click', () => removeFilter(filterType, filterValue))
  filterTagsContainer.appendChild(tagElement)
}

function removeFilter (filterType, filterValue) {
  selectedFilters[filterType] = selectedFilters[filterType].filter(filter => filter !== filterValue)
  updateDisplayedRecipes()
  const filterTags = document.querySelectorAll('.filter-tag')
  filterTags.forEach(tag => {
    if (tag.textContent === filterValue) {
      tag.remove()
      addOptionToList('IngredientsList', filterValue)
    }
  })
}

function updateDisplayedRecipes () {
  const filteredRecipes = recipes.filter(recipe =>
    selectedFilters.ingredients.every(ingredient =>
      recipe.ingredients.some(rIngredient =>
        rIngredient.ingredient.toLowerCase() === ingredient
      )
    )
  )

  displayRecipes(filteredRecipes) // Afficher les recettes filtrées
}
