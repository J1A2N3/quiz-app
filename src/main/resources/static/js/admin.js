document.addEventListener("DOMContentLoaded", () => {
  const quizSelect = document.getElementById("quizId");
  const form = document.getElementById("addQuestionForm");
  const successModal = document.getElementById("successModal");
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");

  if (!quizSelect || !form || !yesBtn || !noBtn || !successModal) {
    console.error("⚠️ Missing critical HTML elements.");
    return;
  }

  // Load quizzes
  fetch("https://quiz-app-2-sdfo.onrender.com/quiz/all")
    .then(res => res.json())
    .then(quizzes => {
      quizzes.forEach(quiz => {
        const option = document.createElement("option");
        option.value = quiz.id;
        option.textContent = quiz.title;
        quizSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Failed to load quizzes:", error);
      alert("Error loading quizzes.");
    });

  // Form submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const quizId = parseInt(quizSelect.value);
    if (isNaN(quizId)) {
      alert("Please select a valid quiz.");
      return;
    }

    const questionData = {
      content: document.getElementById("questionText").value,
      option1: document.getElementById("option1").value,
      option2: document.getElementById("option2").value,
      option3: document.getElementById("option3").value,
      option4: document.getElementById("option4").value,
      answer: document.getElementById("answer").value,
      topic: document.getElementById("topic").value,
      quiz: { id: quizId }
    };

    try {
      const res = await fetch(`https://quiz-app-2-sdfo.onrender.com/question/${questionData.quiz.id}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(questionData)
      });

      if (res.ok) {
        successModal.style.display = "flex";
      } else {
        const msg = await res.text();
        alert("Failed to add question:\n" + msg);
      }
    } catch (err) {
      console.error("Network/server error:", err);
      alert("Error connecting to backend.");
    }
  });

  // Modal buttons
  yesBtn.addEventListener("click", () => {
    successModal.style.display = "none";
    form.reset();
  });

  noBtn.addEventListener("click", () => {
    window.location.href = "login.html";
  });
});
