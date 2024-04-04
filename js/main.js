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
import { fillOptionsWithFilter } from './filterSelect.js'

let ingredientsList = []
let appliancesList = []
let utensilsList = []
const selectedFilters = {
  ingredients: [],
  appliances: [],
  utensils: []
}

addTagsListsContent(recipes, selectedFilters)

fillOptionsWithFilter('Ingredients', ingredientsList, 'IngredientsList')
fillOptionsWithFilter('Appareils', appliancesList, 'AppareilsList')
fillOptionsWithFilter('Ustensiles', utensilsList, 'UstensilesList')

displayRecipes(recipes)

document.querySelector('#IngredientsList').addEventListener('change', (e) => {
  const selectedIngredient = e.target.value.toLowerCase()
  const recipesWithSelectedIngredient = recipes.filter(recipe =>
    recipe.ingredients.some(ingredient =>
      ingredient.ingredient.toLowerCase() === selectedIngredient
    )
  )

  if (recipesWithSelectedIngredient.length > 0) {
    selectedFilters.ingredients.push(selectedIngredient)
    const filteredRecipes = updateDisplayedRecipes(selectedFilters, recipes)
    addFilterTag('ingredients', selectedIngredient)
    addTagsListsContent(filteredRecipes, selectedFilters)
    fillOptionsWithFilter('Ingredients', ingredientsList, 'IngredientsList')
    fillOptionsWithFilter('Appareils', appliancesList, 'AppareilsList')
    fillOptionsWithFilter('Ustensiles', utensilsList, 'UstensilesList')
    displayRecipes(filteredRecipes)
  } else {
    alert(`Aucune recette ne contient l'ingrédient "${selectedIngredient}".`)
  }
})

document.querySelector('#AppareilsList').addEventListener('change', (e) => {
  const selectedAppliance = e.target.value.toLowerCase()
  const recipesWithSelectedAppliance = recipes.filter(recipe =>
    recipe.appliance.toLowerCase() === selectedAppliance
  )

  if (recipesWithSelectedAppliance.length > 0) {
    selectedFilters.appliances.push(selectedAppliance)
    const filteredRecipes = updateDisplayedRecipes(selectedFilters, recipes)
    addFilterTag('appliances', selectedAppliance)
    addTagsListsContent(filteredRecipes, selectedFilters)
    fillOptionsWithFilter('Ingredients', ingredientsList, 'IngredientsList')
    fillOptionsWithFilter('Appareils', appliancesList, 'AppareilsList')
    fillOptionsWithFilter('Ustensiles', utensilsList, 'UstensilesList')
    displayRecipes(filteredRecipes)
  } else {
    alert(`Aucune recette ne contient l'appareil "${selectedAppliance}".`)
  }
})

document.querySelector('#UstensilesList').addEventListener('change', (e) => {
  const selectedUtensil = e.target.value.toLowerCase()
  const recipesWithSelectedUtensil = recipes.filter(recipe =>
    recipe.ustensils.some(utensil =>
      utensil.toLowerCase() === selectedUtensil
    )
  )

  if (recipesWithSelectedUtensil.length > 0) {
    selectedFilters.utensils = [selectedUtensil]
    const filteredRecipes = updateDisplayedRecipes(selectedFilters, recipes)
    addFilterTag('utensils', selectedUtensil)
    addTagsListsContent(filteredRecipes, selectedFilters)
    fillOptionsWithFilter('Ingredients', ingredientsList, 'IngredientsList')
    fillOptionsWithFilter('Appareils', appliancesList, 'AppareilsList')
    fillOptionsWithFilter('Ustensiles', utensilsList, 'UstensilesList')
    displayRecipes(filteredRecipes)
  } else {
    alert(`Aucune recette ne contient l'ustensile "${selectedUtensil}".`)
  }
})

function removeFilter (filterType, filterValue) {
  selectedFilters[filterType] = selectedFilters[filterType].filter(filter => filter !== filterValue)
  updateDisplayedRecipes(selectedFilters)
  const filterTags = document.querySelectorAll('.filter-tag')
  filterTags.forEach(tag => {
    if (tag.textContent === filterValue) {
      tag.remove()
      addOptionToList(`${filterType}List`, filterValue)
    }
  })
}

function addOptionToList (selectId, optionValue) {
  const selectorElement = document.getElementById(selectId)
  const optionElement = document.createElement('option')
  optionElement.value = optionValue
  optionElement.textContent = optionValue
  selectorElement.appendChild(optionElement)
}

// Ajouter le tag au click sur le site
function addFilterTag (filterType, filterValue) {
  const filterTagsContainer = document.getElementById('filterTags')
  const tagElement = document.createElement('div')
  tagElement.textContent = filterValue
  tagElement.classList.add('filter-tag')
  const iconElement = document.createElement('i')
  iconElement.classList.add('fa', 'fa-xmark')
  tagElement.appendChild(iconElement)
  tagElement.addEventListener('click', () => removeFilter(filterType, filterValue))
  filterTagsContainer.appendChild(tagElement)
}

function updateDisplayedRecipes (selectedFilters, recipes) {
  return recipes.filter(recipe => {
    return selectedFilters.ingredients.every(ingredient =>
      recipe.ingredients.some(rIngredient =>
        rIngredient.ingredient.toLowerCase() === ingredient
      )
    ) && selectedFilters.appliances.every(appliance =>
      recipe.appliance.toLowerCase() === appliance
    ) && selectedFilters.utensils.every(utensil =>
      recipe.ustensils.some(rUtensil =>
        rUtensil.toLowerCase() === utensil
      )
    )
  })
}

function addTagsListsContent (recipes, selectedFilters) {
  ingredientsList = []
  appliancesList = []
  utensilsList = []
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      if (!ingredientsList.includes(ingredient.ingredient.toLowerCase()) && !selectedFilters.ingredients.find(elt => elt.toLowerCase() === ingredient.ingredient.toLowerCase())) {
        ingredientsList.push(ingredient.ingredient.toLowerCase())
      }
    })

    if (!appliancesList.includes(recipe.appliance.toLowerCase()) && !selectedFilters.appliances.find(elt => elt.toLowerCase() === recipe.appliance.toLowerCase())) {
      appliancesList.push(recipe.appliance.toLowerCase())
    }

    recipe.ustensils.forEach(utensil => {
      if (!utensilsList.includes(utensil.toLowerCase()) && !selectedFilters.utensils.find(elt => elt.toLowerCase() === utensil.toLowerCase())) {
        utensilsList.push(utensil.toLowerCase())
      }
    })
  })
}
