document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:8082/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        if (data.role === "admin") {
          window.location.href = "/admin_dashboard.html";
        } else {
          window.location.href = "/user_dashboard.html";
        }
      } else {
        alert("Invalid credentials");
      }
    })
    .catch(error => {
      console.error("Error during login:", error);
      alert("Login error. Please try again.");
    });
});
function loginUser(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  // Mock login - you can replace this with real API later
  if (role === "ADMIN") {
    window.location.href = "admin_dashboard.html";
  } else {
    window.location.href = "user_dashboard.html";
  }
}

