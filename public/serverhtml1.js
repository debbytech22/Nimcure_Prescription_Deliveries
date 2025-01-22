const passwordInput = document.querySelector('.password-container #password-input');
const togglePassword = document.querySelector('.password-container #toggle-password');

togglePassword.addEventListener('click', function () {
    const currentType = passwordInput.getAttribute('type');
    if (currentType === 'password') {
        passwordInput.setAttribute('type', 'text');
        togglePassword.textContent = 'Hide';
    } else {
        passwordInput.setAttribute('type', 'password');
        togglePassword.textContent = 'Show';
    }
});



const loginform = document.querySelector('.form-layout'); 
const emailInput = document.getElementById('email-input');
const passwordValue = document.getElementById('password-input');
const rememberMeCheckbox = document.getElementById('Checkbox'); 

loginform.addEventListener('submit', async function (event) {
    event.preventDefault(); 
    const email = emailInput.value.trim();
    const password = passwordValue.value.trim();

    if (!email || !password) {
        alert("All fields must be filled!");
        return;
    }

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                Email: email,
                Password: password,
                rememberMe: rememberMeCheckbox.checked,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(`Login failed: ${errorData}`);
            return;
        }

        const data = await response.json(); 
        console.log('Login successful:', data);

        if (data.token) {
            localStorage.setItem('authToken', data.token);
        }

        if (rememberMeCheckbox.checked) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            console.log('Email and password saved to localStorage.');
        } else {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            console.log('Email and password removed from localStorage.');        
        }



        console.log('POST request sent with:', {
            Email: email,
            Password: password,
            rememberMe: rememberMeCheckbox.checked,
        });


        window.location.href = 'index2.html';
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred while trying to log in. Please try again.');
    }
});

















































































// const loginform = document.querySelector('.form-layout');
// const loginform = document.querySelector('.form-layout'); // The form element
// const emailInput = document.getElementById('email-input'); // Select the email input
// const passwordValue = document.getElementById('password-input'); // Select the password input
// const rememberMeCheckbox = document.getElementById('Checkbox'); 

// loginform.addEventListener('submit', async function (event) {
//     event.preventDefault(); 
//     const email = emailInput.value.trim();
//     const password = passwordValue.value.trim();

//     if (!email || !password) {
//         alert("All fields must be filled!");
//         return;
//     }

//     try {
//         const response = await fetch('/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 Email: email,
//                 Password: password,
//                 rememberMe: rememberMeCheckbox.checked,
//             }),
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             alert(`Login failed: ${errorData.message}`);
//             return;
//         }

//         const data = await response.json(); 
//         console.log('Login successful:', data);

//         if (rememberMeCheckbox.checked) {

//             localStorage.setItem('email', email_value.value);
//         localStorage.setItem('password', password_value.value);
//         console.log('Email and password saved to localStorage.');

//         } else {
//             localStorage.removeItem('email');
//             localStorage.removeItem('password');
//             console.log('Email and password removed from localStorage.');        }

//         window.location.href = 'index2.html';
//     } catch (error) {
//         console.error('Error during login:', error);
//         alert('An error occurred while trying to log in. Please try again.');
//     }
// });


// document.addEventListener('DOMContentLoaded', function () {
//     console.log('DOM is fully loaded and parsed!');
//     const savedEmail = localStorage.getItem('email');
//     const savedPassword = localStorage.getItem('password');

//     if (savedEmail) {
//         emailInput.value = savedEmail;
//         rememberMeCheckbox.checked = true;
//     }

//     if (savedPassword) {
//         passwordValue.value = savedPassword;
//         rememberMeCheckbox.checked = true;
//     }
// });


// const loginform = document.querySelector('.form-layout'); // The form element
// const emailInput = document.getElementById('email-input'); // Select the email input
// const passwordValue = document.getElementById('password-input'); // Select the password input
// const rememberMeCheckbox = document.getElementById('Checkbox'); // The remember-me checkbox

// loginform.addEventListener('submit', async function (event) {
//     event.preventDefault(); // Prevent the form from submitting in the traditional way

//     const email = emailInput.value.trim();
//     const password = passwordValue.value.trim();

//     if (!email || !password) {
//         alert("All fields must be filled!");
//         return;
//     }

//     // try {
//     //     // Send POST request to the backend
//     //     const response = await fetch('/api/login', {
//     //         method: 'POST',
//     //         headers: {
//     //             'Content-Type': 'application/json',
//     //         },
//     //         body: JSON.stringify({
//     //             email: email,
//     //             password: password,
//     //             rememberMe: rememberMeCheckbox.checked,
//     //         }),
//     //     });

//         if (!response.ok) {
//             const errorData = await response.json();
//             alert(`Login failed: ${errorData.message}`);
//             return;
//         }

//         const data = await response.json();
//         console.log('Login successful:', data);

//         // Handle remember me functionality
//         if (rememberMeCheckbox.checked) {
//             localStorage.setItem('email', email);
//             localStorage.setItem('password', password);
//             console.log('Email and password saved to localStorage.');
//         } else {
//             localStorage.removeItem('email');
//             localStorage.removeItem('password');
//             console.log('Email and password removed from localStorage.');
//         }

//         window.location.href = 'index2.html'; // Redirect after successful login
//     // } catch (error) {
//     //     console.error('Error during login:', error);
//     //     alert('An error occurred while trying to log in. Please try again.');
//     // }
// });











