class CocktailDB {
    // Save recipes into local storage
    saveIntoDB(drink) {
        const drinks = this.getFromDB();
        drinks.push(drink);

        // Add the new array into localstorage
        localStorage.setItem('drinks', JSON.stringify(drinks) );
    }
    // Retrive recipes from local storage
    getFromDB() {
        let drinks;
        // Check from localStorage
        if (localStorage.getItem('drinks') === '') {
            drinks = [];

        } else {
            drinks = JSON.parse( localStorage.getItem('drinks') );
        }
        return drinks;
    }
}