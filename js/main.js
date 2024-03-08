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
import { fillSelectOptionsWithFilter, ingredientsList, appliancesList, utensilsList } from './filterSelect.js'

fillSelectOptionsWithFilter('Ingredients', ingredientsList, 'IngredientsSearch')
fillSelectOptionsWithFilter('Appareils', appliancesList, 'AppareilsSearch')
fillSelectOptionsWithFilter('Ustensiles', utensilsList, 'UstensilesSearch')
displayRecipes()
