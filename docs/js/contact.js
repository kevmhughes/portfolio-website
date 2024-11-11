// Initialize EmailJS
emailjs.init("UgbZDkujbJx7CxKt4");

// Function to handle form submission and validation
function sendEmail(event) {
  event.preventDefault();  // Prevent default form submission
  
  // Get form data
  const userName = document.getElementById('user_name').value;
  const userEmail = document.getElementById('user_email').value;
  const message = document.getElementById('message').value;

  // Form validation
  if (!validateForm(userName, userEmail, message)) {
    document.getElementById('error-message').style.display = 'block'; // Show error message
    return;
  } else {
    document.getElementById('error-message').style.display = 'none'; // Hide error message
  }
  
  // Data to send to EmailJS
  const formData = {
    user_name: userName,
    user_email: userEmail,
    message: message
  };

  // Show loading spinner or feedback message (Optional)
  showLoadingSpinner();

  // Send email via EmailJS
  emailjs.send("service_1to1gzb", "template_cjnzzfj", formData)
    .then((response) => {
      console.log('SUCCESS!', response);
      showSuccessMessage();
      hideLoadingSpinner();
    }, (error) => {
      console.log('FAILED...', error);
      showErrorMessage();
      hideLoadingSpinner();
    });
}

// Function to validate form inputs
function validateForm(userName, userEmail, message) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  // Validate that all fields are filled
  if (!userName || !userEmail || !message) {
    alert("All fields are required.");
    return false;
  }

  // Validate the email format
  if (!emailPattern.test(userEmail)) {
    alert("Please enter a valid email address.");
    return false;
  }

  return true;
}

// Function to show success message
function showSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'flex';  // Show success message
    setTimeout(() => {
      successMessage.style.display = 'none'; // Hide after 5 seconds
    }, 5000);
  }
  
  // Function to show error message
  function showErrorMessage() {
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'flex';  // Show error message
    setTimeout(() => {
      errorMessage.style.display = 'none'; // Hide after 5 seconds
    }, 5000);
  }

// Function to show loading spinner
function showLoadingSpinner() {
  // Optional: You can show a loading spinner here while the email is being sent.
  console.log('Sending message...');
}

// Function to hide loading spinner
function hideLoadingSpinner() {
  // Optional: Hide the loading spinner once the email is sent.
  console.log('Message sent!');
}
