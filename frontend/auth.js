// Authentication JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Password visibility toggle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    function displayUserAvatar() {
      const userData = JSON.parse(localStorage.getItem('playflixUser'));
      const avatarElement = document.getElementById('userAvatar');
      
      if (userData && userData.name && avatarElement) {
          // Get first letter of the name and make it uppercase
          const firstLetter = userData.name.charAt(0).toUpperCase();
          avatarElement.textContent = firstLetter;
      }
  }

  function getApiBaseUrl() {
    // In development (localhost)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:3000';
    }
    // In production (your hosted site)
    return 'https://playflix-6id4.onrender.com'; // Replace with your actual backend URL
  }


    function handleSignup(event) {
        event.preventDefault();
        
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const language = document.getElementById('signup-language').value;
        
        // Simple validation
        if (!name || !email || !password) {
            alert('Please fill in all required fields');
            return;
        }
        
        if (password.length < 6 || password.length > 60) {
            alert('Password must be between 6 and 60 characters');
            return;
        }
        
        // Create user object
        const user = {
            name,
            email,
            password,
            language,
            plan: 'none', // Default before selecting a plan
            joinDate: new Date().toISOString()
        };
        
        // Store user data in localStorage (in a real app, you'd send to a server)
        localStorage.setItem('playflixUser', JSON.stringify(user));
        
        // Redirect to subscription page
        window.location.href = 'login.html';
    }
    // Form validation for login
    document.getElementById("login-form").addEventListener("submit", async function (e) {
        e.preventDefault();
      
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
      
        try {
          const response = await fetch(`${getApiBaseUrl()}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
          });
      
          const data = await response.json();
      
          if (response.ok) {
            localStorage.setItem('playflixUser', JSON.stringify({
              name: data.user.name,
              email: data.user.email,
              plan: data.user.plan || 'none', // Default to 'none' if no plan
              joinDate: new Date().toISOString(),
              // Add any other relevant user data from the response
              ...data.user // Spread operator to include all user properties
          }));

          displayUserAvatar();

            alert("Login successful! Welcome, " + data.user.name);
            // You can redirect to home or dashboard here
            window.location.href = "content.html";
          } else {
            alert(data.message || "Login failed");
          }
        } catch (err) {
          console.error("Login error:", err);
          alert("Something went wrong. Please try again.");
        }
      });
      


    // Form validation for signup
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // Real-time password validation for signup
    const passwordInput = document.getElementById('signup-password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const lengthReq = document.querySelector('.length-requirement');
            const complexityReq = document.querySelector('.complexity-requirement');
            
            // Update validation indicators
            if (password.length >= 6 && password.length <= 60) {
                lengthReq.style.color = '#46d369';
            } else {
                lengthReq.style.color = '#e87c03';
            }
            
            if (/[a-zA-Z]/.test(password) && /[0-9]/.test(password)) {
                complexityReq.style.color = '#46d369';
            } else {
                complexityReq.style.color = '#e87c03';
            }
        });
    }
});
async function handleSignup(event) {
    event.preventDefault();
  
    const userData = {
      name: document.getElementById("signup-name").value,
      email: document.getElementById("signup-email").value,
      phone: document.getElementById("signup-phone").value,
      password: document.getElementById("signup-password").value,
      language: document.getElementById("signup-language").value,
      plan: document.getElementById("signup-plan").value,
    };
  
    try {
      const res = await fetch(`https://playflix-6id4.onrender.com/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
  
      const data = await res.json();
      if (res.ok) {
        alert("Signup successful!");
        window.location.href = "subscription.html";
      } else {
        alert("Signup failed: " + data.message);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  }
  
// Simple user session management
function checkLoginStatus() {
    // In a real app, you would check for a session token or cookie
    const isLoggedIn = localStorage.getItem('playflixUser');
    const signInBtn = document.querySelector('.signin-btn');
    
    if (isLoggedIn && signInBtn) {
        signInBtn.textContent = 'Account';
        signInBtn.onclick = function() {
            // In a real app, this would go to account management
            window.location.href = 'index.html';
        };
    }
}

// Call this function when the page loads
checkLoginStatus();
