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
        window.location.href = 'subscription.html';
    }
    // Form validation for login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Simple validation
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send the data to your backend
            console.log('Login attempt with:', { email, password });
            
            // For demo purposes, just redirect to home page
            window.location.href = 'index.html';
        });
    }

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
