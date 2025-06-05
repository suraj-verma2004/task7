document.addEventListener('DOMContentLoaded', () => {
    const userDataContainer = document.getElementById('userDataContainer');
    const reloadDataButton = document.getElementById('reloadDataButton');
    const API_URL = 'https://dummyjson.com/users';

    async function fetchAndDisplayUsers() {
        userDataContainer.innerHTML = '<p>Loading user data...</p>'; // Show loading message

        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                // Check for HTTP errors (e.g., 404, 500)
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const users=data.users;

            // Clear previous content
            userDataContainer.innerHTML = '';

            if (users.length === 0) {
                userDataContainer.innerHTML = '<p>No user data found.</p>';
                return;
            }

            users.forEach(user => {
                const userCard = document.createElement('div');
                userCard.classList.add('user-card');
                userCard.innerHTML = `
                    <h2>${user.firstName} ${user.lastName}</h2>
                     <span><strong>Gender:</strong> ${user.gender}</span>
                    <p><strong>Email:</strong><a href="mailto:${user.email}">${user.email}</a></p>
                    <p><strong>Address:</strong> ${user.address.address}, ${user.address.city}, ${user.address.state}, ${user.address.postalCode}</p>
                `;
                userDataContainer.appendChild(userCard);
            });

        } catch (error) {
            console.error('Error fetching user data:', error);
            // Display a user-friendly error message
            userDataContainer.innerHTML = `
                <p class="error-message">Failed to load user data. Please check your internet connection or try again later.</p>
                <p class="error-message">Details: ${error.message}</p>
            `;
        }
    }

    // Initial fetch when the page loads
    fetchAndDisplayUsers();

    // Add event listener for the reload button
    reloadDataButton.addEventListener('click', fetchAndDisplayUsers);
});