// In-memory database of questions
const STORE = [{
    question: 'What is California\'s state flower?',
    choices: ['Poppy', 'Ranunculus', 'Orchid'],
    correct: 'Poppy'
}, {
    question: 'What is California\'s state motto?',
    choices: ['Surf\'s up!', 'Eureka!', 'Hang 10'],
    correct: 'Eureka!'
}, {
    question: 'What is California\'s state animal?',
    choices: ['Black Bear', 'Grizzly Bear', 'Both A & B'],
    correct: 'Grizzly Bear'
}, {
    question: 'How many states does California border?',
    choices: ['2', '3', '4'],
    correct: '3'
}, {
    question: 'Who said "I\'m going going, back back, to Cali Cali?',
    choices: ['Tupac', 'Ice Cube', 'Biggie'],
    correct: 'Biggie'
}];

let questionNumber = 0;
let score = 0;

// this removes Start button and starts the questions/guesses
function removeStartButton() {
    $('.js-start-button').on('click', function(event) {
        event.preventDefault();
        $('.js-start-button').remove(); //remove start button
        renderQuestion();
        questionNum();
        console.log('removed start button');
    });
}

// this generations the question/answer form after clicking start button
function generateQuestion() {
    if (questionNumber < STORE.length) {
        return `<div class="question_${questionNumber}">
        <h2>${STORE[questionNumber].question}</h2>
        <form class="form"> 
        <fieldset>
            <label class="mutipleChoice">
            <input type="radio" value="${STORE[questionNumber].choices[0]}" name="answer" required>
                <span> ${STORE[questionNumber].choices[0]} </span>  
            </label><br>
            <label class="mutipleChoice">
            <input type="radio" value="${STORE[questionNumber].choices[1]}" name="answer">
                <span> ${STORE[questionNumber].choices[1]} </span>  
            </label><br>
            <label class="mutipleChoice">
            <input type="radio" value="${STORE[questionNumber].choices[2]}" name="answer">
                <span> ${STORE[questionNumber].choices[2]} </span>  
            </label><br>
            <button type="submit" class="submitButton">Submit</button>
            </fieldset>
        </form>
        </div>`
    } else {
        quizComplete();
        $('.questionNum').text(5);
    };
}
//increment questionNumber each time user presses 'submit'
function incrementQuestionNumber() {
    if (questionNumber < STORE.length) {
        questionNumber++;
    }
    console.log('increased the question number');
}

//took the div for the question form and added the html for the above function to get question/guesses appearing
function renderQuestion() {
    $('.quizForm').html(generateQuestion());
    console.log('Generated a question for you!');
}

//user presses 'submit', feedback is presented 
function clickSubmit() {
    $(document).on('submit', '.form', function(event) {
        event.preventDefault();
        let checked = $('input:checked');
        let answer = checked.val();
        let correct = STORE[questionNumber].correct;
        if (answer === correct) {
            $('.quizForm').html(answerCorrect());
        } else {
            $('.quizForm').html(answerIncorrect());
        }
        incrementQuestionNumber();
    });
}

//correct screen
function answerCorrect() {
    scoreNum();
    return `<h3>You got it!</h3><br>
    <button type="submit" class= "nextButton">Next</button>`;
}
//incorrect screen
function answerIncorrect() {
    return `<h3>Sorry, that's not right..</h3><br>
    <button type="submit" class= "nextButton">Next</button>`

}

//user presses 'next', generates next question 
function clickNext() {
    $(document).on('click', '.nextButton', function(event) {
        generateQuestion();
        renderQuestion();
        questionNum();
    })
}

//score count
function scoreNum() {
    $('.scoreNum').text(score + 1);
    score++;
}

//question count
function questionNum() {
    if (STORE.length > questionNumber) {
        $('.questionNum').text(questionNumber + 1);
    }
}


//end of quiz - total is displayed

function quizComplete() {
    if (score >= 3) {
        $('.quizForm').html(`<h3>Wow! You did great!</h3>
        <button class="retakeQuiz" type="submit">Retake</button>`);
    } else if (score < 3) {
        $('.quizForm').html(`<h3>Better luck next time!</h3><br>
        <button class="retakeQuiz" type="submit">Retake Quiz</button>`);
    }
}

//on click of 'try again' button, the whole quiz is regenerated 
function retakeQuiz() {
    $(document).on('click', '.retakeQuiz', function(event) {
        location.reload();
    })
}


// //place all functions here that runs quiz
function createQuiz() {
    removeStartButton();
    clickSubmit();
    clickNext();
    retakeQuiz();
}

$(createQuiz);