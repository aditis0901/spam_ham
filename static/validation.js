const form = document.getElementById('emailForm');
const emailInput = document.getElementById('emailInput');

form.addEventListener('submit', (event) => {
    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(emailInput.value)) {
        // Prevent form submission
        event.preventDefault();
        emailInput.setCustomValidity('Please enter a valid email address');
    } else {
        // Clear the custom error message if valid
        emailInput.setCustomValidity('');
    }
});
