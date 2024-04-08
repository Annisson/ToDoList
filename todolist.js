let shoppingList = [];

function AddItem()
{
    const userInput = document.getElementById('formAddItem').value.trim(); // Save the user input

    if (userInput !== '') {
        shoppingList.push({ name: userInput, clicked: false });
        printShoppingList(); // Call the function to print the shopping list
    }
        
}

function printShoppingList() {
    const shoppingListContainer = document.getElementById('shoppingList');
    shoppingListContainer.innerHTML = ''; // Clear list items

    if (shoppingList.length > 0) { // Check if list has at least one more item
        shoppingList.forEach((item, index) => {
            const listItem = document.createElement('li'); // Create a new li for each item in the list
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';

            if (item.clicked) { // Check if item is clicked to add style
                listItem.classList.add('clicked');
            }

            const itemSpan = document.createElement('span'); // Add span to hold the item and the remove-button
            itemSpan.textContent = item.name;
            listItem.appendChild(itemSpan);

            
            const removeButton = document.createElement('button'); // Creates a remove-button for each item
            removeButton.textContent = 'Remove';
            removeButton.className = 'btn btn-danger btn-sm';
            removeButton.dataset.index = index; // To find the items index
            listItem.appendChild(removeButton);

            listItem.addEventListener('click', function() { // Add event listener for clicking on the li
                item.clicked = !item.clicked;
                printShoppingList(); 
            });

            removeButton.addEventListener('click', function(event) { // Event listener for removing item
                event.stopPropagation(); // Prevent li click event when removing
                removeItem(index); // Call removeItem function with index to remove the item
            });

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

// Function to toggle the clicked state of an item
function toggleItemClickedState(index) {
    shoppingList[index].clicked = !shoppingList[index].clicked;
}

function changeItemStyle(event) {
    const clickedItem = event.target.closest('li'); // Find the closest li element
    const index = Array.from(clickedItem.parentNode.children).indexOf(clickedItem); // Get the index of the clicked item

    toggleItemClickedState(index); // Toggle the clicked state
    printShoppingList(); 
}

function removeItem(index) {
    shoppingList.splice(index, 1); // Remove the item from the shoppingList array
    printShoppingList(); 
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addButton').addEventListener('click', function() {
        AddItem(); // Call AddItem function to add item to the list
    });
    printShoppingList(); // Call printShoppingList when the page loads
});

document.getElementById('shoppingList').addEventListener('click', function(event) { 
    const clickedElement = event.target;

    if (clickedElement.tagName === 'BUTTON' && clickedElement.textContent.trim() === 'Remove') {
        const indexToRemove = parseInt(clickedElement.dataset.index); // Get the index
        removeItem(indexToRemove); // Call the removeItem function with the index
    }
});
