document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.querySelector(".form-container");

  
  document.getElementById("login").addEventListener("click", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    alert("Login successful!");
    window.location.href = "home.html"; // 
  });


  document.getElementById("signup").addEventListener("click", function () {
    formContainer.innerHTML = `
      <h1>SIGN UP FORM</h1>
      <form id="signupForm">
        <label>Name:</label>
        <input type="text" placeholder="Enter your name" id="name" required>

        <label>Email:</label>
        <input type="email" placeholder="Enter your email" id="email" required>

        <label>Create Password:</label>
        <input type="password" placeholder="Enter a password" id="password" required>

        <label>Branch:</label>
        <input type="branch" placeholder="Enter your branch" id="branch" required>
        <button type="submit" id="createAccount" class="btn">Create Account</button>

        
      </form>
    `;

    
    document.getElementById("signupForm").addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document.getElementById("branch").value.trim();

      if (!name || !email || !password || !branch) {
        alert("Please fill in all fields.");
        return;
      }

      

      alert("Account created successfully!");
      location.reload(); 
    });
  });
});
