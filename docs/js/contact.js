// Initialize EmailJS with your user ID
emailjs.init("UgbZDkujbJx7CxKt4");

// Widget ID variable for explicit reCAPTCHA rendering
let widgetId;

// This function is called when the reCAPTCHA API finishes loading
function onloadCallback() {
  console.log("grecaptcha is ready!");
  widgetId = grecaptcha.render('recaptcha-container', {
    'sitekey': '6LeltFkrAAAAAPEG8JPYSCXDftKf4CjX2v6Q7AlN'
  });
}

// Wait for DOM content to load before attaching event listener
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', sendEmail);
});

// Handle form submission
function sendEmail(event) {
  event.preventDefault();

  // Get reCAPTCHA response token explicitly using widget ID
  const recaptchaResponse = grecaptcha.getResponse(widgetId);
  console.log("reCAPTCHA token before send:", recaptchaResponse);

  // Require reCAPTCHA completion
  if (!recaptchaResponse) {
    alert('Please confirm you are not a robot.');
    return;
  }

  // Put token in hidden input so EmailJS can read it
  document.getElementById('g-recaptcha-response').value = recaptchaResponse;

  // Get user inputs
  const userName = document.getElementById('user_name').value.trim();
  const userEmail = document.getElementById('user_email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Validate form inputs
  if (!validateForm(userName, userEmail, message)) {
    document.getElementById('error-message').style.display = 'block';
    return;
  } else {
    document.getElementById('error-message').style.display = 'none';
  }

  showLoadingSpinner();

  // Send form using EmailJS
  emailjs.sendForm("service_7slz0dg", "template_cjnzzfj", "#contact-form")
    .then(response => {
      console.log('SUCCESS!', response);
      showSuccessMessage();
      hideLoadingSpinner();
      grecaptcha.reset(widgetId);  // Reset reCAPTCHA widget for new submission
      // Optional: clear form fields if desired
      // document.getElementById('contact-form').reset();
    })
    .catch(error => {
      console.log('FAILED...', error);
      showErrorMessage();
      hideLoadingSpinner();
      grecaptcha.reset(widgetId);
    });
}

// Basic validation for the form fields
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

  if (message.length < 10) {
    alert("Message should be at least 10 characters.");
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

// Show loading spinner (you can replace with actual spinner)
function showLoadingSpinner() {
  console.log('Sending message...');
}

// Hide loading spinner
function hideLoadingSpinner() {
  console.log('Message sent!');
}
