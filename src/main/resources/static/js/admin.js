document.getElementById("addQuestionForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const question = {
    content: document.getElementById("questionText").value,
    option1: document.getElementById("option1").value,
    option2: document.getElementById("option2").value,
    option3: document.getElementById("option3").value,
    option4: document.getElementById("option4").value,
    answer: document.getElementById("answer").value,
    topic: document.getElementById("topic").value,
    quiz: {
      id: parseInt(document.getElementById("quizId").value)  // Make sure this input exists
    }
  };

  fetch("https://quiz-app-2-sdfo.onrender.com/${quizId}/questions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(question)
  })
    .then(response => {
      if (!response.ok) throw new Error("Failed to add question");
      return response.json();
    })
    .then(data => {
		document.getElementById("successModal").style.display = "flex";

		        document.getElementById("yesBtn").onclick = () => {
		            document.getElementById("successModal").style.display = "none";
		            document.getElementById("addQuestionForm").reset();
		        };

		        document.getElementById("noBtn").onclick = () => {
		            window.location.href = "login.html"; 
		        };
    })
    .catch(error => {
      console.error("Error adding question:", error);
      alert("Failed to add question.");
    });
});
