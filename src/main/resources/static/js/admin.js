window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("https://quiz-app-2-sdfo.onrender.com/quiz/all");
    const quizzes = await res.json();

    const quizSelect = document.getElementById("quizId");
    quizzes.forEach((quiz) => {
      const option = document.createElement("option");
      option.value = quiz.id;
      option.textContent = quiz.title; // or quiz.name if that's your column
      quizSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Failed to load quizzes:", error);
    alert("Error loading quizzes. Please try again.");
  }
});



document.getElementById("addQuestionForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const questionData = {
    content: document.getElementById("questionText").value,
    option1: document.getElementById("option1").value,
    option2: document.getElementById("option2").value,
    option3: document.getElementById("option3").value,
    option4: document.getElementById("option4").value,
    answer: document.getElementById("answer").value,
    topic: document.getElementById("topic").value,
    quiz: {
      id: parseInt(document.getElementById("quizId").value)
    }
  };

  try {
    const res = await fetch("https://quiz-app-2-sdfo.onrender.com/${questionData.quiz.id}question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(questionData)
    });

    if (res.ok) {
      document.getElementById("successModal").style.display = "flex";
    } else {
      const errorMsg = await res.text();
      alert("Failed to add question.\n" + errorMsg);
      console.error("Error:", errorMsg);
    }
  } catch (error) {
    alert("Error connecting to backend.");
    console.error("Exception:", error);
  }
});

document.getElementById("yesBtn").addEventListener("click", () => {
  document.getElementById("successModal").style.display = "none";
  document.getElementById("addQuestionForm").reset();
});

document.getElementById("noBtn").addEventListener("click", () => {
  window.location.href = "login.html"; // or wherever you want to redirect
});
