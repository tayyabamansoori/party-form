document.addEventListener('DOMContentLoaded', function() {
    // Load the confirmed friends from localStorage and display them
    const savedFriends = JSON.parse(localStorage.getItem('confirmedFriends')) || [];
    const confirmedList = document.getElementById('confirmedList');

    savedFriends.forEach(friend => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${friend.name.charAt(0)}</strong> - ${friend.name} <span class="green-check">✔️</span> <button class="remove-button" data-name="${friend.name}">❌</button>`;
        confirmedList.appendChild(listItem);

        // Add event listener to the remove button
        listItem.querySelector('.remove-button').addEventListener('click', function() {
            const nameToRemove = this.getAttribute('data-name');
            removeConfirmedFriend(nameToRemove);
        });
    });
});

document.getElementById('partyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const friendName = document.getElementById('friendName').value.trim();
    const confirmedList = document.getElementById('confirmedList');
    const messageDiv = document.getElementById('message');
    
    // Check if the input is not empty
    if (friendName === '') {
        messageDiv.innerHTML = "Please enter a friend's name!";
        return;
    }

    // Check if the friend is already in the list
    const existingFriend = Array.from(confirmedList.querySelectorAll('li'))
        .some(item => item.innerHTML.includes(friendName));
    if (existingFriend) {
        messageDiv.innerHTML = "This friend is already on the list!";
        return;
    }

    // Create a new list item for the confirmed friend
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${friendName.charAt(0)}</strong> - ${friendName} <span class="green-check">✔️</span> <button class="remove-button" data-name="${friendName}">❌</button>`;
    confirmedList.appendChild(listItem);

    // Save the confirmed friend to localStorage
    saveFriendToLocalStorage(friendName);

    // Clear the message and input field
    messageDiv.innerHTML = "Thank you!";
    document.getElementById('partyForm').reset();

    // Add event listener to the remove button
    listItem.querySelector('.remove-button').addEventListener('click', function() {
        const nameToRemove = this.getAttribute('data-name');
        removeConfirmedFriend(nameToRemove);
    });
});

function saveFriendToLocalStorage(friendName) {
    let savedFriends = JSON.parse(localStorage.getItem('confirmedFriends')) || [];
    // Add friend if not already in the list
    if (!savedFriends.some(friend => friend.name === friendName)) {
        savedFriends.push({ name: friendName });
        localStorage.setItem('confirmedFriends', JSON.stringify(savedFriends));
    }
}

function removeConfirmedFriend(friendName) {
    const confirmedList = document.getElementById('confirmedList');
    const listItems = confirmedList.querySelectorAll('li');

    // Remove the item from the DOM
    listItems.forEach(item => {
        if (item.innerHTML.includes(friendName)) {
            confirmedList.removeChild(item);
        }
    });

    // Remove the item from localStorage
    let savedFriends = JSON.parse(localStorage.getItem('confirmedFriends')) || [];
    savedFriends = savedFriends.filter(friend => friend.name !== friendName);
    localStorage.setItem('confirmedFriends', JSON.stringify(savedFriends));
}
