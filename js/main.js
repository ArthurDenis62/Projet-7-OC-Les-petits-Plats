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

const IngredientsList = document.getElementById('IngredientsList')
const Ingredients = document.getElementById('Ingredients')
IngredientsList.onfocus = function () {
  Ingredients.style.display = 'block'
}
for (const option of Ingredients.options) {
  option.onclick = function () {
    IngredientsList.value = option.value
    Ingredients.style.display = 'none'
  }
};
IngredientsList.oninput = function () {
  const text = IngredientsList.value.toUpperCase()
  for (const option of Ingredients.options) {
    if (option.value.toUpperCase().indexOf(text) > -1) {
      option.style.display = 'block'
    } else {
      option.style.display = 'none'
    }
  };
}
let currentFocus1 = -1
IngredientsList.onkeydown = function (e) {
  if (e.keyCode === 40) {
    currentFocus1++
    addActive1(Ingredients.options)
  } else if (e.keyCode === 38) {
    currentFocus1--
    addActive1(Ingredients.options)
  } else if (e.keyCode === 13) {
    e.preventDefault()
    if (currentFocus1 > -1) {
      if (Ingredients.options) { Ingredients.options[currentFocus1].click() }
    }
  }
}

function addActive1 (x) {
  if (!x) return false
  removeActive1(x)
  if (currentFocus1 >= x.length) currentFocus1 = 0
  if (currentFocus1 < 0) { currentFocus1 = (x.length - 1) }
  x[currentFocus1].classList.add('active')
}
function removeActive1 (x) {
  for (let i = 0; i < x.length; i++) {
    x[i].classList.remove('active')
  }
}

const AppareilsList = document.getElementById('AppareilsList')
const Appareils = document.getElementById('Appareils')
AppareilsList.onfocus = function () {
  Appareils.style.display = 'block'
}
for (const option of Appareils.options) {
  option.onclick = function () {
    AppareilsList.value = option.value
    Appareils.style.display = 'none'
  }
};
AppareilsList.oninput = function () {
  const text = AppareilsList.value.toUpperCase()
  for (const option of Appareils.options) {
    if (option.value.toUpperCase().indexOf(text) > -1) {
      option.style.display = 'block'
    } else {
      option.style.display = 'none'
    }
  };
}
let currentFocus2 = -1
AppareilsList.onkeydown = function (e) {
  if (e.keyCode === 40) {
    currentFocus2++
    addActive2(Appareils.options)
  } else if (e.keyCode === 38) {
    currentFocus2--
    addActive2(Appareils.options)
  } else if (e.keyCode === 13) {
    e.preventDefault()
    if (currentFocus2 > -1) {
      if (Appareils.options) { Appareils.options[currentFocus2].click() }
    }
  }
}

function addActive2 (x) {
  if (!x) return false
  removeActive2(x)
  if (currentFocus2 >= x.length) currentFocus2 = 0
  if (currentFocus2 < 0) { currentFocus2 = (x.length - 1) }
  x[currentFocus2].classList.add('active')
}
function removeActive2 (x) {
  for (let i = 0; i < x.length; i++) {
    x[i].classList.remove('active')
  }
}

const UstensilesList = document.getElementById('UstensilesList')
const Ustensiles = document.getElementById('Ustensiles')
UstensilesList.onfocus = function () {
  Ustensiles.style.display = 'block'
}
for (const option of Ustensiles.options) {
  option.onclick = function () {
    UstensilesList.value = option.value
    Ustensiles.style.display = 'none'
  }
};
UstensilesList.oninput = function () {
  const text = UstensilesList.value.toUpperCase()
  for (const option of Ustensiles.options) {
    if (option.value.toUpperCase().indexOf(text) > -1) {
      option.style.display = 'block'
    } else {
      option.style.display = 'none'
    }
  };
}
let currentFocus3 = -1
UstensilesList.onkeydown = function (e) {
  if (e.keyCode === 40) {
    currentFocus3++
    addActive3(Ustensiles.options)
  } else if (e.keyCode === 38) {
    currentFocus3--
    addActive3(Ustensiles.options)
  } else if (e.keyCode === 13) {
    e.preventDefault()
    if (currentFocus3 > -1) {
      if (Ustensiles.options) { Ustensiles.options[currentFocus3].click() }
    }
  }
}

function addActive3 (x) {
  if (!x) return false
  removeActive3(x)
  if (currentFocus3 >= x.length) currentFocus3 = 0
  if (currentFocus3 < 0) { currentFocus3 = (x.length - 1) }
  x[currentFocus3].classList.add('active')
}
function removeActive3 (x) {
  for (let i = 0; i < x.length; i++) {
    x[i].classList.remove('active')
  }
}

const dropDown1 = document.querySelector('.drop-down1')
const searchContent1 = document.querySelector('.SearchContent')
dropDown1.addEventListener('click', e => {
  const container = e.target.classList.contains("drop-down1")? e.target : e.target.closest(".drop-down1")
  container.classList.toggle("open")
  if (container.classList.contains("open")) {
    dropDown1.querySelector('input').focus()
  }
})

searchContent1.addEventListener('click', e => {
  if (e.target.nodeName != 'OPTION') {
    e.stopPropagation()
  }
  if (e.target.nodeName === 'OPTION') {
    const selectedOption = e.target
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
    searchContent1.querySelector('input').value = ''
    e.stopPropagation()
  }
})

document.querySelector('#AppareilsList').addEventListener('change', (e) => {
  const selectedAppliance = e.target.value.toLowerCase()
  e.target.value = ''
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

const dropDown2 = document.querySelector('.drop-down2')
const searchContent2 = dropDown2.querySelector('.SearchContent')
dropDown2.addEventListener('click', e => {
  const container = e.target.classList.contains("drop-down2")? e.target : e.target.closest(".drop-down2")
  container.classList.toggle("open")
})

searchContent2.addEventListener('click', e => {
  e.stopPropagation()
})

document.querySelector('#UstensilesList').addEventListener('change', (e) => {
  const selectedUtensil = e.target.value.toLowerCase()
  e.target.value = ''
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

const dropDown3 = document.querySelector('.drop-down3')
const searchContent3 = dropDown3.querySelector('.SearchContent')
dropDown3.addEventListener('click', e => {
  const container = e.target.classList.contains("drop-down3")? e.target : e.target.closest(".drop-down3")
  container.classList.toggle("open")
})

searchContent3.addEventListener('click', e => {
  e.stopPropagation()
})

function removeFilter (filterType, filterValue) {
  selectedFilters[filterType] = selectedFilters[filterType].filter(filter => filter !== filterValue)
  const filteredRecipes = updateDisplayedRecipes(selectedFilters, recipes)
  addTagsListsContent(filteredRecipes, selectedFilters)
  fillOptionsWithFilter('Ingredients', ingredientsList, 'IngredientsList')
  fillOptionsWithFilter('Appareils', appliancesList, 'AppareilsList')
  fillOptionsWithFilter('Ustensiles', utensilsList, 'UstensilesList')
  displayRecipes(filteredRecipes)
}

function removeFilterTag (elt) {
  elt.remove()
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
  tagElement.addEventListener('click', () => {
    removeFilter(filterType, filterValue)
    removeFilterTag(tagElement)
  })
  filterTagsContainer.appendChild(tagElement)
}

function updateDisplayedRecipes (selectedFilters, recipes) {
  const filteredRecipes = recipes.filter(recipe => {
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
  document.getElementById('NbrRecipes').textContent = `${filteredRecipes.length} recettes`
  return filteredRecipes
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

const submitButton = document.querySelector('#mainFilter button[type="button"]')
submitButton.addEventListener('click', () => {
  const searchInput = document.getElementById('Search')
  const searchTerm = searchInput.value.trim().toLowerCase()
  if (searchTerm.length >= 3) {
    const filteredRecipes = filterRecipes(searchTerm)
    displayRecipes(filteredRecipes)
    updateDisplayedRecipes(selectedFilters, filteredRecipes)
  } else if (searchTerm.length === 0) {
    displayRecipes(recipes)
  }
})

const searchInput = document.getElementById('Search')

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.trim().toLowerCase()

  if (searchTerm.length >= 3) {
    const filteredRecipes = filterRecipes(searchTerm)
    displayRecipes(filteredRecipes)
    updateDisplayedRecipes(selectedFilters, filteredRecipes)
  } else if (searchTerm.length === 0) {
    displayRecipes(recipes)
  }
})

function filterRecipes (searchTerm) {
  return recipes.filter(recipe =>
    searchTerm.split(/\s*,\s*|\s+/).every(searchTerm =>
      recipe.name.toLowerCase().includes(searchTerm.trim()) || // Par titre de recette
      recipe.ingredients.some(ingredient =>
        ingredient.ingredient.toLowerCase().includes(searchTerm.trim()) // Par ingrédients
      ) ||
      recipe.appliance.toLowerCase().includes(searchTerm.trim()) || // Par appareils
      recipe.ustensils.some(utensil =>
        utensil.toLowerCase().includes(searchTerm.trim()) // Par ustensiles
      ) ||
      recipe.description.toLowerCase().includes(searchTerm.trim()) // Par descriptions
    )
  )
}

updateDisplayedRecipes(selectedFilters, recipes)
