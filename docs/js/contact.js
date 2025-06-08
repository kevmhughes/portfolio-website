// Initialize EmailJS
emailjs.init("UgbZDkujbJx7CxKt4");

// Handle form submission
function sendEmail(event) {
  event.preventDefault();

  const form = document.getElementById("contact-form");

  // Check reCAPTCHA response
  const recaptchaResponse = grecaptcha.getResponse();
  if (!recaptchaResponse) {
    alert("Please confirm you are not a robot.");
    return;
  }

  // Validate inputs
  const userName = form.user_name.value;
  const userEmail = form.user_email.value;
  const message = form.message.value;

  if (!validateForm(userName, userEmail, message)) {
    showErrorMessage();
    return;
  } else {
    document.getElementById('error-message').style.display = 'none'; // Hide error
  }

  showLoadingSpinner();

  emailjs
    .sendForm("service_1to1gzb", "template_cjnzzfj", form)
    .then((response) => {
      console.log("SUCCESS!", response);
      showSuccessMessage();
      grecaptcha.reset(); // Reset CAPTCHA
      form.reset();       // Reset form
    })
    .catch((error) => {
      console.error("FAILED...", error);
      showErrorMessage();
    })
    .finally(() => {
      hideLoadingSpinner();
    });
}

// Validate form fields
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

// Feedback helpers
function showSuccessMessage() {
  const successMessage = document.getElementById("success-message");
  successMessage.style.display = "flex";
  setTimeout(() => (successMessage.style.display = "none"), 5000);
}

function showErrorMessage() {
  const errorMessage = document.getElementById("error-message");
  errorMessage.style.display = "flex";
  setTimeout(() => (errorMessage.style.display = "none"), 5000);
}

function showLoadingSpinner() {
  console.log("Sending message...");
}

function hideLoadingSpinner() {
  console.log("Done sending.");
}
