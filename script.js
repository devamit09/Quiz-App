// Array of question objects containing questions, answer options, and correct answers
const questions = [
    {
        question : "The normal temperature in the body of human beings is?",
        answers: [
            {text: "37.2° C",correct:true},
            {text: "39.2° C",correct:false},
            {text: "37.4° C",correct:false},
            {text: "37.4° C",correct:false},
        ]
    },
    {
        question : "Which state organizes the world's largest open air theatre Dhanu Yatra festival ?",
        answers: [
            {text: "Gujarat",correct:false},
            {text: "Maharashtra",correct:false},
            {text: "Odisha",correct:true},
            {text: "Kerala",correct:false},
        ]
    },
    {
        question : "Which district of Odisha is known as Rice Bowl ?",
        answers: [
            {text: "Bargarh",correct:true},
            {text: "Gajapati",correct:false},
            {text: "Cuttack",correct:false},
            {text: "Khurdha",correct:false},
        ]
    },
    {
        question : "Which is longest dam in the world ?",
        answers: [
            {text: "Tarbela Dam",correct:false},
            {text: "Fort Peck Dam",correct:false},
            {text: "Tehri Dam",correct:false},
            {text: "Hirakud Dam",correct:true},
        ]
    },
    {
        question : "Which is smallest continent in the world ?",
        answers: [
            {text: "Asia",correct:false},
            {text: "Australia",correct:true},
            {text: "Arctic",correct:false},
            {text: "Africa",correct:false},
        ]
    }
];

// DOM element references
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const backButton = document.getElementById("back-btn");

// Quiz state variables
let currentQuestionIndex = 0;  // Tracks current question
let score = 0;                // Tracks correct answers
let userAnswers = Array(questions.length).fill(null); // Stores user's answers

// ========== CORE FUNCTIONS ========== //

// Initializes/resets the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers.fill(null); // Reset all answers
    nextButton.innerHTML = "Next";
    showQuestion();
}

// Displays current question and answer buttons
function showQuestion() {
    resetState(); // Clear previous answers
    
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    
    // Display question number and text
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    // Create answer buttons
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        
        // If user previously answered, show correctness
        if(userAnswers[currentQuestionIndex] === index) {
            button.classList.add(answer.correct ? "correct" : "incorrect");
        }
        
        button.addEventListener("click", () => selectAnswer(index));
    });

    // Show/hide navigation buttons
    backButton.style.display = currentQuestionIndex > 0 ? "block" : "none";
    nextButton.style.display = "none"; // Hide until answer is selected
}

// Clears answer buttons
function resetState() {
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Handles answer selection
function selectAnswer(answerIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedBtn = answerButtons.children[answerIndex];
    const isCorrect = currentQuestion.answers[answerIndex].correct;

    // Store user's answer
    userAnswers[currentQuestionIndex] = answerIndex;

    // Visual feedback
    if(isCorrect) {
        selectedBtn.classList.add("correct");
    } else {
        selectedBtn.classList.add("incorrect");
        // Highlight correct answer if wrong
        currentQuestion.answers.forEach((answer, idx) => {
            if(answer.correct) {
                answerButtons.children[idx].classList.add("correct");
            }
        });
    }

    // Disable all buttons after selection
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    });
    
    nextButton.style.display = "block"; // Show next button
}

// Calculates final score
function calculateScore() {
    score = userAnswers.reduce((total, answerIndex, questionIndex) => {
        return total + (answerIndex !== null && 
               questions[questionIndex].answers[answerIndex].correct ? 1 : 0);
    }, 0);
}

// ========== NAVIGATION FUNCTIONS ========== //

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore(); // Quiz complete
    }
}

function handleBackButton() {
    currentQuestionIndex--;
    showQuestion();
}

// Displays final score
function showScore() {
    calculateScore();
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    backButton.style.display = "none";
}

// ========== EVENT LISTENERS ========== //

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz(); // Restart if quiz is complete
    }
});

backButton.addEventListener("click", handleBackButton);

// Initialize quiz
startQuiz();