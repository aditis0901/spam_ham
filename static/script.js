document.addEventListener('DOMContentLoaded', function () {
    const emailForm = document.getElementById('emailForm');
    const emailInput = document.getElementById('emailInput');
    const errorMessage = document.getElementById('error-message');
    const resultDiv = document.getElementById('result');

    emailForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent form submission from refreshing the page

        // Clear any previous messages
        errorMessage.textContent = '';
        resultDiv.textContent = '';

        // Validate the email input
        const email = emailInput.value.trim();
        if (!email) {
            errorMessage.textContent = 'Please enter an email address.';
            return;
        }

        try {
            // Send the input to the Flask backend for classification
            const response = await fetch('/classify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });

            if (!response.ok) {
                throw new Error('Prediction failed. Please try again.');
            }

            const result = await response.json();

            if (result.error) {
                errorMessage.textContent = `Error: ${result.error}`;
            } else {
                // Display the prediction result
                resultDiv.textContent = `Prediction: ${result.prediction}`;
                resultDiv.className = result.prediction === 'Spam' ? 'result spam' : 'result non-spam';
            }
        } catch (error) {
            console.error('Error:', error);
            errorMessage.textContent = 'An unexpected error occurred. Please try again later.';
        }
    });
});

async function predictSpam(event) {
    event.preventDefault(); // Prevent form submission from refreshing the page

    // Retrieve the user input
    const emailInput = document.getElementById('emailInput').value;

    // Prepare the data for sending to the server
    const data = JSON.stringify({ email: emailInput });

    try {
        // Send the input to the Flask backend for classification
        const response = await fetch('/classify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        // Parse the JSON response
        const result = await response.json();

        // Display the prediction result
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `Prediction: ${result.prediction}`;
    } catch (error) {
        console.error('Error:', error);
    }
}

// document.addEventListener('DOMContentLoaded', function () {
//     const emailForm = document.getElementById('emailForm');

//     emailForm.addEventListener('submit', predictSpam);
// });
