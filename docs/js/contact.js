// Initialize EmailJS
emailjs.init("UgbZDkujbJx7CxKt4");

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('contact-form').addEventListener('submit', sendEmail);
});

// Function to handle form submission and validation
function sendEmail(event) {
  event.preventDefault();  // Prevent default form submission

  // Check reCAPTCHA response
  const recaptchaResponse = grecaptcha.getResponse();
  if (!recaptchaResponse) {
    alert('Please confirm you are not a robot.');
    return;
  }

  // Set reCAPTCHA response into hidden input field so EmailJS can read it
  document.getElementById('g-recaptcha-response').value = recaptchaResponse;

  // Get form values for manual validation
  const userName = document.getElementById('user_name').value;
  const userEmail = document.getElementById('user_email').value;
  const message = document.getElementById('message').value;

  // Validate form fields
  if (!validateForm(userName, userEmail, message)) {
    document.getElementById('error-message').style.display = 'block';
    return;
  } else {
    document.getElementById('error-message').style.display = 'none';
  }

  showLoadingSpinner();

  // Send form via EmailJS using form selector
  emailjs.sendForm("service_7slz0dg", "template_cjnzzfj", "#contact-form")
    .then((response) => {
      console.log('SUCCESS!', response);
      showSuccessMessage();
      hideLoadingSpinner();
      grecaptcha.reset();
    }, (error) => {
      console.log('FAILED...', error);
      showErrorMessage();
      hideLoadingSpinner();
      grecaptcha.reset();
    });
}

// Function to validate form inputs
function validateForm(userName, userEmail, message) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!userName || !userEmail || !message) {
    alert("All fields are required.");
    return false;
  }

  if (!emailPattern.test(userEmail)) {
    alert("Please enter a valid email address.");
    return false;
  }

  return true;
}

// Function to show success message
function showSuccessMessage() {
  const successMessage = document.getElementById('success-message');
  successMessage.style.display = 'flex';
  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 5000);
}

// Function to show error message
function showErrorMessage() {
  const errorMessage = document.getElementById('error-message');
  errorMessage.style.display = 'flex';
  setTimeout(() => {
    errorMessage.style.display = 'none';
  }, 5000);
}

// Function to show loading spinner
function showLoadingSpinner() {
  console.log('Sending message...');
}

// Function to hide loading spinner
function hideLoadingSpinner() {
  console.log('Message sent!');
}
