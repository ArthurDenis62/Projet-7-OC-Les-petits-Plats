const ingredientsList = []
const appliancesList = []
const utensilsList = []

const selectedFilters = {
  ingredients: [],
  appliances: [],
  utensils: []
}

function fillOptionsWithFilter (selectId, optionsList, searchInputId) {
  const selectorElement = document.getElementById(selectId)

  // Remplir les options initiales
  optionsList.forEach(option => {
    const optionElement = document.createElement('option')
    optionElement.value = option
    optionElement.textContent = option
    selectorElement.appendChild(optionElement)
  })
}

function getListWithoutSelectedValue (filterType, optionsList) {
  const allSelectedOptions = Object.values(selectedFilters)
    .reduce((accumulator, currentValue) => accumulator.concat(currentValue), [])
    .filter(option => option !== filterType)

  return optionsList.filter(option => !allSelectedOptions.includes(option))
}

export { getListWithoutSelectedValue, fillOptionsWithFilter, ingredientsList, appliancesList, utensilsList }
