// UI class
class UI {
    // Display drinks category
    displayCategory() {
        // Instance of cocktail
        const categoryList = cocktail.getCategories()
              .then(categories => {
                  const catList = categories.categories.drinks;
                  // Append first option value
                  const firstOption = document.createElement('option');
                  firstOption.textContent = '- Select -';
                  firstOption.value = '';
                  document.querySelector('#search').appendChild(firstOption);
                  // append into the select
                  catList.forEach(category => {
                      const option = document.createElement('option');
                      option.textContent = category.strCategory;
                      option.value = category.strCategory.split(' ').join('_');
                      document.querySelector('#search').appendChild(option);
                  });
                  
              })
    }
    // Display drinks withouth ingredients
    displayDrinks(drinks) {
        // Show results
        const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display = 'block';
        // Inserts the results
        const resultsDiv = document.querySelector('#results');
        // Look through the drinks
        drinks.forEach(drink => {
            resultsDiv.innerHTML += `
              <div class="col-md-6 ">
                <div class="card my-3">
                    <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
                    +
                    </button>
                    <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                    <div class="card-body">
                        <h2 class="card-title text-center">${drink.strDrink}</h2>
                        <a data-target="#recipe" class="btn btn-success get-recipe" href="#" data-toggle="modal" data-id="${drink.idDrink}">Get Recipe</a>
                    </div>
                </div>
            </div>  
            `;
            
        })
        

    }
    // Display drinks with ingridients
    displayDrinksWithIngredients(drinks) {
        // Show results
        const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display = 'block';

        // Inserts the results
        const resultsDiv = document.querySelector('#results');

        drinks.forEach(drink => {
            resultsDiv.innerHTML += `
                <div class="col-md-6 ">
                    <div class="card my-3">
                        <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
                        +
                        </button>
                        <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">

                        <div class="card-body">
                            <h2 class="card-title text-center">${drink.strDrink}</h2>
                            <p class="card-text font-weight-bold">Instructions: </p>
                            <p class="card-text">
                                ${drink.strInstructions}
                            </p>
                            <p class="card-text">
                                <ul class="list-group">
                                    <li class="list-group-item alert alert-danger">Ingridients</li>
                                    ${this.displaysIngredients(drink)}
                                </ul>
                            </p>
                            <p class="card-text font-weight-bold">Extra Info: </p>
                            <p class="card-text">
                                <span class="badge badge-pill badge-success">
                                ${drink.strAlcoholic}
                                </span>
                                <span class="badge badge-pill badge-warning">
                                    Category: ${drink.strCategory}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    // Printsss the ingridients and measurements
    displaysIngredients(drink) {
        
        let ingredients = [];
        for(let i = 1; i < 16; i++) {
            const ingredientMeasure = {};
            if( drink[`strIngredient${i}`] !== '' ) {
                ingredientMeasure.ingredient = drink[`strIngredient${i}`];
                ingredientMeasure.measure = drink[`strMeasure${i}`];
                ingredients.push(ingredientMeasure);
            }
        }
        // console.log(ingredients)
        // Build template
        let ingredientTemplate = '';
        ingredients.forEach(ingredient => {
            ingredientTemplate += `
            <li class="list-group-item">${ingredient.ingredient}- ${ingredient.measure}</li>
            `;
        });
        return ingredientTemplate;
    }
    // Displays recipe into modal
    displaySingleRecipe(recipe) {
        // Get variables
        const modalTitle = document.querySelector('.modal-title'),
              modalDescription = document.querySelector('.modal-body .description-text'),
              modalIngredients = document.querySelector('.modal-body .ingredient-list .list-group');

        // set values
        modalTitle.innerHTML = recipe.strDrink;
        modalDescription.innerHTML = recipe.strInstructions;
        modalIngredients.innerHTML = this.displaysIngredients(recipe);
    }
    // Print the message method
    printMessage(message, className) {
        const div = document.createElement('div');
        // Add to HTML
        div.innerHTML = `
            <div class="alert alert-dismissable alert-${className} text-center">
                <button type="button" class="close" data-dismiss="alert">x</button>
                ${message}
            </div>
        `;
        // Insert before
        const reference = document.querySelector('.jumbotron h1');
        const parentNode = reference.parentElement;
         parentNode.insertBefore(div, reference);

         // Remove after 3 seconds
         setTimeout(() => {
             document.querySelector('.alert').remove();
         }, 3000);
    }
    //Clear results from the previous window
    clearResults() {
        const resultsDiv = document.querySelector('#results');
        resultsDiv.innerHTML = '';
    }
}