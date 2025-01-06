const passwordInput = document.querySelector('.password-container #password-input');
const togglePassword = document.querySelector('.password-container #toggle-password');

// Add event listener for toggle functionality
togglePassword.addEventListener('click', function(){
  // Toggle the input type between 'password' and 'text'
  const currentType = passwordInput.getAttribute('type');
  if (currentType === 'password') {
    passwordInput.setAttribute('type', 'text');
    togglePassword.textContent = 'Hide'; // Change button text to "Hide"
} else {
    passwordInput.setAttribute('type', 'password');
    togglePassword.textContent = 'Show'; // Change button text to "Show"
}
});


const loginform = document.querySelector('.form-layout');
const email_value=document.querySelector('.email-container #email-input')
const password_value=document.querySelector('.password-container  #password-input');
const rememberMeCheckbox = document.querySelector('.checkbox-class .style-checkbox');


loginform.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
      // Check if the "Remember Me" checkbox is checked
  if (rememberMeCheckbox.checked) {
    // Save the password to localStorage
    localStorage.setItem('password', password_value.value );
    localStorage.setItem('email', email_value.value );

    console.log("email and password saved to localStorage.");
  } else {
    // Remove the password from localStorage if not remembered
    localStorage.removeItem('password');
    localStorage.removeItem('email');
    console.log("email and Password removed from localStorage.");
  }

});


document.addEventListener('DOMContentLoaded', function() {
  
  console.log("DOM is fully loaded and parsed!");
    const savedPassword = localStorage.getItem('password'); 
    const savedEmail = localStorage.getItem('password'); 

  
    if (savedPassword) {

      password_value.value = savedPassword;
      rememberMeCheckbox.checked = true; 
      console.log("Password loaded from localStorage.");
    }

    if (savedEmail) {

      email_value.value = savedEmail;
      rememberMeCheckbox.checked = true; 
      console.log("Email loaded from localStorage.");
    }
  });

 
  
  document.querySelector(".login-button").addEventListener("click", function(e) {
    const email = document.getElementById('password-input').value;
    const password = document.getElementById('email-input').value;
    if (!email || !password) {
        e.preventDefault();
        alert("All fields must be filled!");
        return;
       
    }

    console.log('button clicked')
  window.location.href = "index2.html";
});






// index2 page

// console.log(wmf.textContent);



