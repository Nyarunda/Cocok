class CocktailAPI{


    // Get recipe by name
    async getDrinksByName(name) {
        // Search by name
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        // Return a json response
        const cocktails = await apiResponse.json();
        // return an object
        return {
            cocktails
        }
    }
    // Get recipe by ingredient
    async getDrinksByIngredient(ingredient) {
        // Search by ingredient
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}
        `);
        // Returns a json response
        const cocktails = await apiResponse.json();

        // return objects
        return {
            cocktails
        }
    }
    //Get recipe id
    async getSingleRecipe(id) {
        // Search by ingredient
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}
        `);
        // Returns a json response
        const recipe = await apiResponse.json();

        // return objects
        return {
            recipe
        }
    }
    // Get the cartegory API
    async getCategories() {
        // Search  for category
        const apiResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        // JSON response
        const categories = await apiResponse.json();
        // return object
        return {
            categories
        }
    }
    // Get drinks by category
    async getDrinksByCategory(category) {
        // Search by category
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
        // Returns a json response
        const cocktails = await apiResponse.json();

        // return objects
        return {
            cocktails
        }
    }
    // Get alcohol or non-alcohol drinks
    async getDrinksByAlcohol( term ) {
         // Search by category
         const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${term}`);
         // Returns a json response
         const cocktails = await apiResponse.json();
 
         // return objects
         return {
             cocktails
         }
    }
}