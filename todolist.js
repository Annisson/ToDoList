let shoppingList = [];

function AddItem()
{
    const userInput = document.getElementById('formAddItem').value.trim(); // Save the user input

    if (userInput !== '') {
        shoppingList.push(userInput);
        printShoppingList(); // Call the function to print the shopping list
    }
        
}

function printShoppingList() {
    const shoppingListContainer = document.getElementById('shoppingList');
    shoppingListContainer.innerHTML = ''; // Clear list items

    if (shoppingList.length > 0) { // Check if list has at least one more item
        shoppingList.forEach(item => {
            const listItem = document.createElement('li'); // Create a new li for each item in the list
            listItem.className = 'list-group-item';
            listItem.textContent = item;
            shoppingListContainer.appendChild(listItem);
        });
    } 
    else {
        const noItemsMessage = document.createElement('li'); // If the list is empty, this message will show instead
        noItemsMessage.className = 'list-group-item';
        noItemsMessage.textContent = 'There are currently no items in the shoppinglist';
        shoppingListContainer.appendChild(noItemsMessage);
    }
}


// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    printShoppingList(); // Call printShoppingList when the page loads
});

document.getElementById('addButton').addEventListener('click', function() { // Event listener for when the user clicks the Add item-button
    AddItem();// Call the AddItem function to add item to the list
});  
