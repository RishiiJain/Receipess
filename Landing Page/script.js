// Fetch recipe data from the backend or API
const recipes = [
    {id:1, name: 'Spaghetti Carbonara', img: 'spaghetti.jpg', cookingTime: '30 mins', ingredients: ['spaghetti', 'eggs', 'bacon', 'Parmesan cheese'] },
    {id:2, name: 'Vegetable Stir-Fry', img: 'stir-fry.jpg', cookingTime: '20 mins', ingredients: ['mixed vegetables', 'soy sauce', 'garlic', 'ginger'] },
    // Add more recipes here
];

//Display recipe cards on page load
window.onload = function() {
    const main = document.querySelector('main');
    recipes.forEach(recipe => {
        const card = createRecipeCard(recipe);
        main.appendChild(card);
    });
};


function addRecipeCards(recipes) {
    const main = document.querySelector('main');
    main.innerHTML = ''; // Clear previous content

    recipes.forEach(recipe => {
        const card = createRecipeCard(recipe);
        main.appendChild(card);
    });
}

// Create recipe card element
function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.classList.add('recipe-card');
    card.setAttribute('data-name', recipe.name);
    const img = document.createElement('img');
    img.src = `/Images/${recipe.img}`;
    img.alt = recipe.name;
    card.appendChild(img);

    const name = document.createElement('h2');
    name.textContent = recipe.name;
    card.appendChild(name);

    const details = document.createElement('div');
    details.classList.add('recipe-details');
    details.innerHTML = `
        <p><strong>Cooking Time:</strong> ${recipe.cookingTime}</p>
        <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
    `;
    card.appendChild(details);

    // Add click event listener to show detailed view
    card.addEventListener('click', () => showDetailedView(recipe));

    // Add favorite button
    const favoriteBtn = document.createElement('button');
    favoriteBtn.textContent = 'Favorite';
    favoriteBtn.classList.add('favorite-btn');
    favoriteBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the card click event from firing
        toggleFavorite(recipe);
    });
    card.appendChild(favoriteBtn);

    return card;
}

// Function to show detailed view of the recipe in a modal
function showDetailedView(recipe) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>${recipe.name}</h2>
            <p><strong>Cooking Time:</strong> ${recipe.cookingTime}</p>
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
        </div>
    `;
    const closeButton = modal.querySelector('.close-btn');
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    document.body.appendChild(modal);
}
// Function to toggle favorite status of a recipe
function toggleFavorite(recipe) {
    const index = recipes.findIndex(item => item.name === recipe.name);
    if (index !== -1) {
        recipes[index].isFavorite = !recipes[index].isFavorite;
        const favoriteBtn = document.querySelector(`.recipe-card[data-name="${recipe.name}"] .favorite-btn`);
        favoriteBtn.textContent = recipes[index].isFavorite ? 'Unfavorite' : 'Favorite';
    }
}


// Implementing search functionality
const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = this.querySelector('input').value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm));
    addRecipeCards(filteredRecipes);
});

// Implementing filtering functionality (by cooking time)
const filterForm = document.querySelector('.filter-form');
filterForm.addEventListener('change', function() {
    const selectedCookingTime = this.querySelector('select').value;
    const filteredRecipes = recipes.filter(recipe => {
        if (selectedCookingTime === 'all') {
            return true;
        } else if (selectedCookingTime === 'under30') {
            return parseInt(recipe.cookingTime) <= 30;
        } else if (selectedCookingTime === 'over30') {
            return parseInt(recipe.cookingTime) > 30;
        }
    });
    addRecipeCards(filteredRecipes);
});