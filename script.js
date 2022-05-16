var score = 0;
var questionsIndex = 0;
var startTime = 60;
var pauseInterval = 0;
var timeSubtraction = 5;
const timeLeft = document.getElementById("timeLeft");
const timer = document.getElementById("timer");
const questionsContainer = document.getElementById("questionsContainer");
const wrapper = document.getElementById("content");
const createUl = document.createElement("ul");
const multiChoiceQuestions = [{
    question: "The Condition in an if / else statement is enclosed with ___________.",
    multipleChoices: ["quotes", "curly brackets ", "parenthesis", "square brackets"],
    answer: "parenthesis",
},
{
    question:  "String values must be enclosed within_____ when being assigned to variables.",
    multipleChoices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes",
},
{
    question: "Commonly used data types DO NOT include:",
    multipleChoices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question: "Arrays in JavaScript can be used to store:",
    multipleChoices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above",
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    multipleChoices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    answer: "JavaScript",
  },
];

  // Event listener to start timer, and display questions
timer.addEventListener("click", function() {
    if (pauseInterval === 0) {
        pauseInterval = setInterval(function() {
            startTime--;
            timeLeft.textContent = "Time: " + startTime;
            if (startTime <= 0) {
                clearInterval(pauseInterval);
                finished();
                timeLeft.textContent = "Time's up!";
            }
        }, 1000);
    }
    display(questionsIndex);
});
// Displays questions and if Correct 
function display(questionsIndex) {
    questionsContainer.innerHTML = "";
    createUl.innerHTML = "";
    for (var i = 0; i < multiChoiceQuestions.length; i++) {
        let userQuestions = multiChoiceQuestions[questionsIndex].question;
        var userAnswers = multiChoiceQuestions[questionsIndex].multipleChoices;
        questionsContainer.textContent = userQuestions;
    }
    userAnswers.forEach(function(nextQuestion) {
        let listItem = document.createElement("li");
        listItem.textContent = nextQuestion;
        questionsContainer.appendChild(createUl);
        createUl.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
};
// Compare choices with answers
function compare(event) {
    let element = event.target;
    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.id = "createDiv";
        if (element.textContent == multiChoiceQuestions[questionsIndex]) {
            score++;
            createDiv.textContent = "Correct!   " + multiChoiceQuestions[questionsIndex].answer;
        } else {
            startTime = startTime - timeSubtraction;
            createDiv.textContent = "Wrong! The correct answer is:  " + multiChoiceQuestions[questionsIndex].answer;
        }
    }
    // Question Index determines which question user is on
    questionsIndex++;
    if (questionsIndex >= multiChoiceQuestions.length) {
        finished();
    } else {
        display(questionsIndex);
    }
    questionsContainer.appendChild(createDiv);
};
// Final page with initials and score 
function finished() {
    questionsContainer.innerHTML = "";
    timeLeft.innerHTML = "";
    const createH1 = document.createElement("h1");
    createH1.id = "createH1";
    createH1.textContent = "All done!"
    questionsContainer.appendChild(createH1);
    const createP = document.createElement("p");
    createP.id = "createP";
    questionsContainer.appendChild(createP);

    // Calculates final score with time remaining and questions correct 
    if (startTime >= 0) {
        var timeRemaining = startTime;
        const createP2 = document.createElement("p");
        clearInterval(pauseInterval);
        createP.textContent = "Your final score is: " + timeRemaining * 2;
        questionsContainer.appendChild(createP2);
    }
    const infoPrompt = document.createElement("label");
    infoPrompt.id = "createLabel";
    infoPrompt.textContent = "Enter your initials: ";
    questionsContainer.appendChild(infoPrompt);
    // Input initials
    const userInitials = document.createElement("input");
    userInitials.type = "text";
    userInitials.id = "initials";
    userInitials.textContent = "";
    questionsContainer.appendChild(userInitials);
    // Submit score and initials
    const saveInfo = document.createElement("button");
    saveInfo.type = "submit";
    saveInfo.id = "Submit";
    saveInfo.textContent = "Submit";
    questionsContainer.appendChild(saveInfo);
    // Stores initials/score in local storage
    saveInfo.addEventListener("click", function() {
        var initials = userInitials.value;
        if (initials === "") {
            console.log("No value entered!");
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining * 2
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("scores.html");
        }
    })
};