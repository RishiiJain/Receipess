// Fetch recipe data from the backend or API
const recipes = [
    { name: 'Spaghetti Carbonara', img: 'spaghetti.jpg', cookingTime: '30 mins', ingredients: ['spaghetti', 'eggs', 'bacon', 'Parmesan cheese'] },
    { name: 'Vegetable Stir-Fry', img: 'stir-fry.jpg', cookingTime: '20 mins', ingredients: ['mixed vegetables', 'soy sauce', 'garlic', 'ginger'] },
    // Add more recipes here
];

// Display recipe cards on page load
window.onload = function() {
    const main = document.querySelector('main');
    recipes.forEach(recipe => {
        const card = createRecipeCard(recipe);
        main.appendChild(card);
    });
};

// Create recipe card element
function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.classList.add('recipe-card');

    const img = document.createElement('img');
    img.src = `images/${recipe.img}`;
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

    return card;
}

// Function to show detailed view of the recipe
function showDetailedView(recipe) {
    // Create and display detailed view (modal or separate page)
    alert(`Recipe: ${recipe.name}\nCooking Time: ${recipe.cookingTime}\nIngredients: ${recipe.ingredients.join(', ')}`);
}