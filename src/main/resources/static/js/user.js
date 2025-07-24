let selectedAnswers = {};
let currentQuizId = null;

window.addEventListener("DOMContentLoaded", () => {
  fetch("https://quiz-app-2-sdfo.onrender.com/quiz/all") 
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      const quizList = document.getElementById("quizList");
      quizList.innerHTML = "<h3>Select a Quiz:</h3>";

      data.forEach(quiz => {
        const btn = document.createElement("button");
        btn.innerText = quiz.title;
        btn.addEventListener("click", () => {
          currentQuizId = quiz.id;
          loadQuestionsForQuiz(quiz.id);
        });
        quizList.appendChild(btn);
      });
    })
    .catch(err => {
      console.error("Error loading quizzes:", err);
      alert("Failed to load quizzes. Check backend and network.");
    });
});

function loadQuestionsForQuiz(quizId) {
  selectedAnswers = {};
  fetch(`/${quizId}/questions`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      const container = document.getElementById("quiz-container");
      container.innerHTML = "<h3>Questions:</h3>";

      data.forEach((q, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <p><strong>Q${index + 1}: ${q.content}</strong></p>
          <label><input type="radio" name="q${q.id}" value="${q.option1}"> ${q.option1}</label><br>
          <label><input type="radio" name="q${q.id}" value="${q.option2}"> ${q.option2}</label><br>
          <label><input type="radio" name="q${q.id}" value="${q.option3}"> ${q.option3}</label><br>
          <label><input type="radio" name="q${q.id}" value="${q.option4}"> ${q.option4}</label><br><br>
        `;

        container.appendChild(div);

        div.querySelectorAll("input[type=radio]").forEach(radio => {
          radio.addEventListener("change", () => {
            selectedAnswers[q.id] = radio.value;
          });
        });
      });

      const submitBtn = document.createElement("button");
      submitBtn.innerText = "Submit Quiz";
      submitBtn.className = "submit-btn";
      submitBtn.addEventListener("click", () => submitQuiz(data));
      container.appendChild(submitBtn);
    })
    .catch(err => {
      console.error("Error loading questions:", err);
      alert("Could not load quiz questions.");
    });
}

function submitQuiz(questions) {
  let score = 0;
  questions.forEach(q => {
    if (selectedAnswers[q.id] === q.answer) {
      score++;
    }
  });

  const total = questions.length;
  const container = document.getElementById("quiz-container");
  container.innerHTML = `
    <h3>Your Score: ${score} / ${total}</h3>
    <p>${score >= total / 2 ? "🎉 Great Job!" : "😅 Better Luck Next Time!"}</p>
    <button onclick="loadQuestionsForQuiz(${currentQuizId})">Retake Quiz</button>
    <button onclick="location.reload()">Back to Quiz List</button>
  `;
}
