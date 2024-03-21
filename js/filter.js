const IngredientsInput = document.getElementById('IngredientsInput')
const Ingredients = document.getElementById('Ingredients')

IngredientsInput.onfocus = function () {
  Ingredients.style.display = 'block'
  IngredientsInput.style.borderRadius = '5px 5px 0 0'
}

for (const option of Ingredients.options) {
  option.onclick = function () {
    IngredientsInput.value = option.value
    Ingredients.style.display = 'none'
    IngredientsInput.style.borderRadius = '5px'
  }
};

IngredientsInput.oninput = function () {
  const text = IngredientsInput.value.toUpperCase()
  for (const option of Ingredients.options) {
    if (option.value.toUpperCase().indexOf(text) > -1) {
      option.style.display = 'block'
    } else {
      option.style.display = 'none'
    }
  };
}

let currentFocus = -1
IngredientsInput.onkeydown = function (e) {
  if (e.keyCode === 40) {
    currentFocus++
    addActive(Ingredients.options)
  } else if (e.keyCode === 38) {
    currentFocus--
    addActive(Ingredients.options)
  } else if (e.keyCode === 13) {
    e.preventDefault()
    if (currentFocus > -1) {
      if (Ingredients.options) { Ingredients.options[currentFocus].click() }
    }
  }
}

function addActive (x) {
  if (!x) return false
  removeActive(x)
  if (currentFocus >= x.length) currentFocus = 0
  if (currentFocus < 0) { currentFocus = (x.length - 1) }
  x[currentFocus].classList.add('active')
}
function removeActive (x) {
  for (let i = 0; i < x.length; i++) {
    x[i].classList.remove('active')
  }
}
