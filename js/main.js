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

displayRecipes(recipes)

function setupAutoList(inputList, dropdown, focusIndex) {
  inputList.onfocus = function () {
    dropdown.style.display = 'block';
  };

  for (const option of dropdown.options) {
    option.onclick = function () {
      inputList.value = option.value;
      dropdown.style.display = 'none';
    };
  }

  inputList.oninput = function () {
    const text = inputList.value.toUpperCase();
    for (const option of dropdown.options) {
      if (option.value.toUpperCase().indexOf(text) > -1) {
        option.style.display = 'block';
      } else {
        option.style.display = 'none';
      }
    }
  };

  let currentFocus = focusIndex;
  inputList.onkeydown = function (e) {
    if (e.keyCode === 40) {
      currentFocus++;
      addActive(dropdown.options);
    } else if (e.keyCode === 38) {
      currentFocus--;
      addActive(dropdown.options);
    } else if (e.keyCode === 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (dropdown.options) {
          dropdown.options[currentFocus].click();
        }
      }
    }
  };

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add('active');
  }

  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove('active');
    }
  }
}

const IngredientsList = document.getElementById('IngredientsList');
const Ingredients = document.getElementById('Ingredients');
setupAutoList(IngredientsList, Ingredients, -1);

const AppareilsList = document.getElementById('AppareilsList');
const Appareils = document.getElementById('Appareils');
setupAutoList(AppareilsList, Appareils, -1);

const UstensilesList = document.getElementById('UstensilesList');
const Ustensiles = document.getElementById('Ustensiles');
setupAutoList(UstensilesList, Ustensiles, -1);

addListenersToDropDowns()

document.addEventListener('DOMContentLoaded', function() {
  function clearableInput(inputId, listName, listData) {
    const inputField = document.getElementById(inputId);
    const clearIcon = inputField.nextElementSibling;

    inputField.addEventListener('input', function() {
      clearIcon.style.display = inputField.value.length > 0 ? 'block' : 'none';
    });

    clearIcon.addEventListener('click', function() {
      inputField.value = '';
      clearIcon.style.display = 'none';
      fillOptionsWithFilter(listName, listData, inputId);
    });
  }

  clearableInput('IngredientsList', 'Ingredients', ingredientsList);
  clearableInput('AppareilsList', 'Appareils', appliancesList);
  clearableInput('UstensilesList', 'Ustensiles', utensilsList);
});


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

fillOptionsWithFilter('Ingredients', ingredientsList, 'IngredientsList');
setupAutoList(IngredientsList, Ingredients, -1);
fillOptionsWithFilter('Appareils', appliancesList, 'AppareilsList')
setupAutoList(AppareilsList, Appareils, -1);
fillOptionsWithFilter('Ustensiles', utensilsList, 'UstensilesList')
setupAutoList(UstensilesList, Ustensiles, -1);

updateDisplayedRecipes(selectedFilters, recipes)

function addListenersToDropDowns () {
  const dropDowns = Array.from(document.querySelectorAll('.drop-down'))
  dropDowns.forEach(elt => {
    const searchContent = elt.querySelector('.SearchContent')
    elt.addEventListener('click', (e) => {
      const container = e.target.classList.contains("drop-down")? e.target : e.target.closest(".drop-down")
      container.classList.toggle("open")
      if (container.classList.contains("open")) {
         elt.querySelector('input').focus()
      }
    })
    searchContent.addEventListener('click', e => {
      if (e.target.nodeName != 'OPTION') {
        e.stopPropagation()
      }
      if (e.target.nodeName === 'OPTION') {
        const selectedOption = e.target
        const selectedElt = e.target.value.toLowerCase()
        let filteredRecipes = [];
        const type = searchContent.dataset.type
        switch (type){
          case 'Ingredients':
            filteredRecipes = recipes.filter(recipe =>
              recipe.ingredients.some(ingredient =>
                ingredient.ingredient.toLowerCase() === selectedElt
              )
            )
            break;
          case 'Appareils':
              filteredRecipes = recipes.filter(recipe =>
                recipe.appliance.toLowerCase() === selectedElt
              )
              break;
          case 'Ustensiles':
              filteredRecipes = recipes.filter(recipe =>
                recipe.ustensils.some(utensil =>
                  utensil.toLowerCase() === selectedElt
                )
              )
              break;
          }    
        if (filteredRecipes.length > 0) {
          switch (type){
            case 'Ingredients':
              selectedFilters.ingredients.push(selectedElt)
              addFilterTag('ingredients', selectedElt)
              break;
            case 'Appareils':
                selectedFilters.appliances.push(selectedElt)
                addFilterTag('appliances', selectedElt)
                break;
            case 'Ustensiles':
                selectedFilters.utensils.push(selectedElt)
                addFilterTag('utensils', selectedElt)
                break;
          } 
          filteredRecipes = updateDisplayedRecipes(selectedFilters, recipes)
          addTagsListsContent(filteredRecipes, selectedFilters)
          fillOptionsWithFilter('Ingredients', ingredientsList, 'IngredientsList')
          fillOptionsWithFilter('Appareils', appliancesList, 'AppareilsList')
          fillOptionsWithFilter('Ustensiles', utensilsList, 'UstensilesList')
          displayRecipes(filteredRecipes)
        } else {
          alert(`Aucune recette ne contient l'ingrédient "${selectedElt}".`)
        }
        searchContent.querySelector('input').value = ''
        e.stopPropagation()
      }
    })
  })
}