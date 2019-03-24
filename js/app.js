// Instantiate variables
const ui = new UI(),
      cocktail = new CocktailAPI(),
      cocktailDB = new CocktailDB();


// Add event listeners
function eventListeners() {
    // Document ready
    document.addEventListener('DOMContentLoaded', documentReady);

    // Add event listener when form is submitted
    const searchForm = document.querySelector('#search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', getCocktail);
    }   
    // The results div listener
    const resultsDiv = document.querySelector('#results');
    if (resultsDiv) {
        resultsDiv.addEventListener('click', resultsDelegation);
    }

}
eventListeners();

// Get cocktail function
function getCocktail(e) {
    e.preventDefault();

    // Get value from the input
    const searchTerm = document.querySelector('#search').value;
    // Check if soething in the search input
    if (searchTerm === '') {
        // Print the message
        ui.printMessage('Please add something to the form...', 'danger');
    } else {
        // Server response from a promise
        let serverResponse;
        // The type of search (ingredient cocktail, or name)
        const type = document.querySelector('#type').value;
        //Evaluate the type of promise and execute the query
        switch (type) {
            case 'name':
                serverResponse = cocktail.getDrinksByName( searchTerm );
                break;
            case 'ingredient':
                serverResponse = cocktail.getDrinksByIngredient( searchTerm );
                break;
            case 'category':
                serverResponse = cocktail.getDrinksByCategory( searchTerm );
                break;
            case 'alcohol':
                serverResponse = cocktail.getDrinksByAlcohol( searchTerm );
                break;
        }
        // Clear results
        ui.clearResults();
        // Query the Cocktail API
        serverResponse.then(cocktails => {
                // Nothing exists
                if (cocktails.cocktails.drinks === null) {
                    ui.printMessage('There\'re no drinks, try a different term...', 'danger');
                } else {
                    if (type === 'name') {
                        // display with ingredient
                        ui.displayDrinksWithIngredients( cocktails.cocktails.drinks );
                    } else {
                        // display withouth ingredient (category, alcohol, ingredient)
                        ui.displayDrinks(cocktails.cocktails.drinks);
                    }
                }
            })
    }
}
// Results delegation area
function resultsDelegation(e) {
    e.preventDefault();

    if (e.target.classList.contains('get-recipe')) {
        cocktail.getSingleRecipe( e.target.dataset.id )
            .then(recipe => {
                // Display single recipes into modal
                ui.displaySingleRecipe( recipe.recipe.drinks[0] );
            })
    }

    // WHen fevorite btn is clicked
    if (e.target.classList.contains('favorite-btn')) {
        if (e.target.classList.contains('is-favorite') ) {
            // Remove class
            e.target.classList.remove('is-favorite');
            e.target.textContent = '+';
        } else {
            // Add class
            e.target.classList.add('is-favorite');
            e.target.textContent = '-';

            // Get info
            const cardBody = e.target.parentElement;

            const drinkInfo = {
                id: e.target.dataset.id,
                name: cardBody.querySelector('.card-title').textContent,
                image: cardBody.querySelector('.card-img-top').src
            }
            // console.log(drinkInfo)
            // Add into localstorage
            cocktailDB.saveIntoDB(drinkInfo);
        }
    }
}
// Document ready
function documentReady() {
    // Selecting the search category select
    const searchCategory = document.querySelector('.search-category');
    // Check if the event exists
    if (searchCategory) {
        ui.displayCategory();
    }
}