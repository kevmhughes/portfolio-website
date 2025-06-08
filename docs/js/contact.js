// Initialize EmailJS
emailjs.init("UgbZDkujbJx7CxKt4");

// Function to handle form submission and validation
function sendEmail(event) {
  event.preventDefault();  // Prevent default form submission

  // Get form data
  const userName = document.getElementById('user_name').value;
  const userEmail = document.getElementById('user_email').value;
  const message = document.getElementById('message').value;

  // Get reCAPTCHA token
  const recaptchaToken = grecaptcha.getResponse();
  if (!recaptchaToken) {
    alert("Please complete the reCAPTCHA.");
    return;
  }

  // Validate form fields
  if (!validateForm(userName, userEmail, message)) {
    document.getElementById('error-message').style.display = 'block';
    return;
  } else {
    document.getElementById('error-message').style.display = 'none';
  }

  // Prepare data for EmailJS
  const formData = {
    user_name: userName,
    user_email: userEmail,
    message: message,
    'g-recaptcha-response': recaptchaToken  // Required for EmailJS to validate reCAPTCHA
  };

  showLoadingSpinner();

  // Send email via EmailJS
  emailjs.send("service_7slz0dg", "template_cjnzzfj", formData)
    .then((response) => {
      console.log('SUCCESS!', response);
      showSuccessMessage();
      hideLoadingSpinner();
      grecaptcha.reset(); // Reset reCAPTCHA for another submission
    }, (error) => {
      console.log('FAILED...', error);
      showErrorMessage();
      hideLoadingSpinner();
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

// Show success message
function showSuccessMessage() {
  const successMessage = document.getElementById('success-message');
  successMessage.style.display = 'flex';
  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 5000);
}

// Show error message
function showErrorMessage() {
  const errorMessage = document.getElementById('error-message');
  errorMessage.style.display = 'flex';
  setTimeout(() => {
    errorMessage.style.display = 'none';
  }, 5000);
}

// Show loading spinner (optional)
function showLoadingSpinner() {
  console.log('Sending message...');
}

// Hide loading spinner (optional)
function hideLoadingSpinner() {
  console.log('Message sent!');
}
