// Handle Login form submission
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let userType = document.getElementById('userType').value;
    localStorage.setItem('userType', userType);
    window.location.href = userType + '.html';  // Redirect to respective dashboard
});

// Handle Registration form submission
document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Registration successful!'); // Add actual registration logic
    window.location.href = 'login.html';  // Redirect to login page
});

// Logout functionality
function logout() {
    localStorage.removeItem('userType');
    window.location.href = 'login.html';  // Redirect to login page
}

// Check user type on page load to display respective content
window.addEventListener('DOMContentLoaded', function() {
    const userType = localStorage.getItem('userType');
    if (userType === 'admin') {
        document.getElementById('admin-section').style.display = 'block';
    } else if (userType === 'doctor') {
        document.getElementById('doctor-section').style.display = 'block';
    } else if (userType === 'patient') {
        document.getElementById('patient-section').style.display = 'block';
    }
});
