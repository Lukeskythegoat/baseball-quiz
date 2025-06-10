const questions = [
    { question: "How many strikes does a pitcher need to strike a batter out?", answer: "3" },
    { question: "How many innings are in a standard MLB game?", answer: "9" },
    { question: "What iconic number did Jackie Robinson wear?", answer: "42" },
    { question: "What state has the most MLB teams?", answer: "california" },
    { question: "Who holds the all-time home run record?", answer: "barry bonds" },
    { question: "What stat tracks pitchers' runs given up per nine innings?", answer: "era" },
    { question: "What team drafted Mike Trout?", answer: "angels" },
    { question: "What team has the most World Series titles?", answer: "yankees" },
    { question: "What team broke their 108-year World Series drought in 2016?", answer: "cubs" },
    { question: "What team did Babe Ruth start his career with?", answer: "red sox" }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next");
const resultElement = document.getElementById("result");
const finalScoreElement = document.getElementById("final-score");

function showQuestion() {
    const q = questions[currentQuestion];
    questionElement.textContent = q.question;
    optionsElement.innerHTML = `
        <input type="text" id="userAnswer" placeholder="Type your answer..." class="option-input">
    `;
    nextButton.textContent = currentQuestion < questions.length - 1 ? "Submit" : "Finish";// ai helped me make the button text change depending on the last question
    resultElement.textContent = "";
    finalScoreElement.textContent = "";
}

function checkAnswer() {
    const userInput = document.getElementById("userAnswer").value.trim().toLowerCase();// ai helped to use .trim() and .toLowerCase() to make input checking easier
    const correctAnswer = questions[currentQuestion].answer;

    if (userInput === correctAnswer) {
        resultElement.innerHTML = "<span class='highlight'>✅ Correct!</span>";
        score++;
    } else {
        resultElement.innerHTML = `❌ Incorrect! The correct answer was: <span class="highlight">${correctAnswer}</span>`;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        setTimeout(showQuestion, 1500);// ai helped me use settimeout to add a small delay before going to next
    } else {
        setTimeout(showFinalScore, 1500);
    }
}

function showFinalScore() {
    questionElement.textContent = "Quiz Complete!";
    optionsElement.innerHTML = "";
    nextButton.style.display = "none";
    resultElement.textContent = "";

   const messages = [
        { min: 0, max: 4, text: "You're a rookie!" },
        { min: 5, max: 8, text: "You're an all star!" },
        { min: 9, max: 10, text: "You're a hall of famer!" }
    ];

    let message = "";
    for (let i = 0; i < messages.length; i++) {
        if (score >= messages[i].min && score <= messages[i].max) {
            message = messages[i].text;
            break;
        }
    }

    finalScoreElement.innerHTML = `Your final score: <strong>${score}/10</strong><br>${message}`;
}

nextButton.addEventListener("click", checkAnswer);

showQuestion();
