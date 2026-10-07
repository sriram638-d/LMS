// Demo interactions for the LearnSpace frontend.
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const message = document.getElementById("loginMessage");
      if (!email || password.length < 4) {
        message.textContent = "Enter a valid email and a password with at least 4 characters.";
        message.className = "form-message error";
        return;
      }
      // Frontend demo only: no real authentication is performed.
      sessionStorage.setItem("lmsStudentName", email.split("@")[0] || "Student");
      window.location.href = "dashboard.html";
    });
  }

  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("name").value.trim();
      sessionStorage.setItem("lmsStudentName", name || "Student");
      const message = document.getElementById("signupMessage");
      message.textContent = "Demo account ready! Opening your dashboard…";
      message.className = "form-message success";
      setTimeout(() => window.location.href = "dashboard.html", 700);
    });
  }

  const greeting = document.getElementById("dashGreeting");
  if (greeting) {
    const savedName = sessionStorage.getItem("lmsStudentName");
    if (savedName) greeting.textContent = `Welcome, ${savedName} 👋`;
  }

  const courseSearch = document.getElementById("courseSearch");
  if (courseSearch) {
    courseSearch.addEventListener("input", () => {
      const query = courseSearch.value.toLowerCase();
      document.querySelectorAll(".course-card").forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(query) ? "" : "none";
      });
    });
  }

  document.querySelectorAll(".filter-pill").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-pill").forEach(item => item.classList.remove("selected"));
      button.classList.add("selected");
      const filter = button.dataset.filter;
      document.querySelectorAll(".material-card").forEach(card => {
        card.style.display = filter === "all" || card.dataset.course === filter ? "flex" : "none";
      });
    });
  });

  document.querySelectorAll(".mark-submit").forEach(button => {
    button.addEventListener("click", () => {
      const row = button.closest("tr");
      const status = row.querySelector(".status");
      status.textContent = "Submitted";
      status.className = "status status-done";
      button.replaceWith(Object.assign(document.createElement("span"), { textContent: "Completed", className: "muted" }));
      const message = document.getElementById("assignmentMessage");
      if (message) {
        message.textContent = "Assignment status updated in this demo.";
        message.className = "form-message success";
      }
    });
  });

  document.querySelectorAll("[data-demo-download]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      alert("Demo resource: add your PDF file to the project folder and link it here.");
    });
  });

  const forgotLink = document.getElementById("forgotLink");
  if (forgotLink) forgotLink.addEventListener("click", event => {
    event.preventDefault();
    alert("Password reset is a demo feature. A real reset needs a backend or email service.");
  });
});