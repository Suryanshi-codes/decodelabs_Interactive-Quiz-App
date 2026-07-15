const questions = [
    {
        question: "Which language is used to style web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "Java", correct: false },
            { text: "Python", correct: false }
        ]
    },
    {
        question: "Which language is used to make a webpage interactive?",
        answers: [
            { text: "CSS", correct: false },
            { text: "JavaScript", correct: true },
            { text: "HTML", correct: false },
            { text: "C++", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        answers: [
            { text: "<img>", correct: false },
            { text: "<a>", correct: true },
            { text: "<link>", correct: false },
            { text: "<p>", correct: false }
        ]
    },
    {
        question: "Which company developed JavaScript?",
        answers: [
            { text: "Microsoft", correct: false },
            { text: "Netscape", correct: true },
            { text: "Google", correct: false },
            { text: "IBM", correct: false }
        ]
    },
    {
        question: "Which method is used to select an element by ID in JavaScript?",
        answers: [
            { text: "getElementById()", correct: true },
            { text: "queryClass()", correct: false },
            { text: "getElement()", correct: false },
            { text: "selectById()", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

const current = document.getElementById("current");
const total = document.getElementById("total");

const quizBox = document.querySelector(".quiz-box");
const resultBox = document.getElementById("result-box");
const scoreText = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

total.innerText = questions.length;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    resultBox.classList.add("hide");
    quizBox.style.display = "block";
    showQuestion();
}

function showQuestion() {

    resetState();

    current.innerText = currentQuestionIndex + 1;

    let currentQuestion = questions[currentQuestionIndex];

    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");

        button.innerHTML = answer.text;

        button.classList.add("btn");

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);

    });
}

function resetState() {

    nextButton.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {

    const selectedBtn = e.target;

    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
    }

    Array.from(answerButtons.children).forEach(button => {

        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = true;

    });

    nextButton.style.display = "inline-block";
}

function showScore() {

    quizBox.style.display = "none";

    resultBox.classList.remove("hide");

    scoreText.innerHTML = score + " / " + questions.length;
}

function handleNextButton() {

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {

        showQuestion();

    } else {

        showScore();

    }
}

nextButton.addEventListener("click", () => {

    handleNextButton();

});

function restartQuiz() {

    quizBox.style.display = "block";

    startQuiz();

}

startQuiz();