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
    question: 'Who said "I\'m going going, back back, to Cali Cali?"',
    choices: ['Tupac', 'Ice Cube', 'Biggie'],
    correct: 'Biggie'
}];

let questionNumber = 0;
let score = 0;

// this removes Start button and starts the questions/guesses
function removeStartButton() {
    $('.js-start-button').on('click', function(event) {
        event.preventDefault();
        $('.quizDiv').remove(); //remove h2 and button
        renderQuestion();
        questionNum();
        console.log('removed start button');
    });
}

// this generations the question/answer form after clicking start button
function generateQuestion() {
    if (questionNumber < STORE.length) {
        return `<div class="questionContainer">
        <h2>${STORE[questionNumber].question}</h2><br>
        <form class="form"> 
        <fieldset>
            <label class="mutipleChoice">
            <input type="radio" value="${STORE[questionNumber].choices[0]}" name="answer" required>
                <span> ${STORE[questionNumber].choices[0]} </span>  
            </label><br><br>
            <label class="mutipleChoice">
            <input type="radio" value="${STORE[questionNumber].choices[1]}" name="answer" required>
                <span> ${STORE[questionNumber].choices[1]} </span>  
            </label><br><br>
            <label class="mutipleChoice">
            <input type="radio" value="${STORE[questionNumber].choices[2]}" name="answer" required>
                <span> ${STORE[questionNumber].choices[2]} </span>  
            </label><br><br>
            <button type="submit" class="submitButton">Submit</button>
            </fieldset>
        </form>
        </div>`
    } else {
        quizComplete();
        $('.questionNum').text(5);
    };
}
//new question number pulls new question
function increaseQuestionNumber() {
    if (questionNumber < STORE.length) {
        questionNumber++;
    }
}

//took the div for the question form and added the html for the above function to get question/guesses appearing
function renderQuestion() {
    $('.quizForm').html(generateQuestion());
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
        increaseQuestionNumber();
    });
}

//correct screen
function answerCorrect() {
    scoreNum();
    console.log('correct answer');
    return `<img src='https://media.giphy.com/media/26FPnsRww5DbqoPuM/giphy.gif' alt='Kenan Thompson saying correct'><br><br><h3>You're correct.</h3><br><br>
    <button type="submit" class= "nextButton">Next</button>`;
}

//incorrect screen
function answerIncorrect() {
    console.log('incorrect answer');
    return `<img src='https://media1.giphy.com/media/l4pLY0zySvluEvr0c/giphy.gif' alt='Gordon Ramsey giphy saying wrong'><br><br>The right answer is <br> "${STORE[questionNumber].correct}" <br><br>
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


//completed quiz - results

function quizComplete() {
    if (score >= 3) {
        $('.quizForm').html(`<img src ='https://media3.giphy.com/media/cEODGfeOYMRxK/giphy.gif?cid=790b76115d053fe16454394773867a7a&rid=giphy.gif' alt='Jimmy Falon saying great job'><br><h3>Checking your score..</h3><br>Wow - you did great!<br><br>
        <button class="retakeQuiz" type="submit">Do it again!</button>`);
    } else if (score < 3) {
        $('.quizForm').html(`<img src='https://media1.giphy.com/media/26gsw7HFlUjCbbUZ2/giphy.gif?cid=790b76115d053f5b68534a586f869985&rid=giphy.gif' alt='disappointed girl'><br><h3>Checking your score..</h3><br>Sorry - better luck next time.<br><br>
        <button class="retakeQuiz" type="submit">Retake Quiz</button>`);
    }
    console.log('user completed quiz');
}

//take user back to home quiz screen
function retakeQuiz() {
    $(document).on('click', '.retakeQuiz', function(event) {
        location.reload();
        console.log('user starting over');
    })
}


// this renders the quiz all over again
function createQuiz() {
    removeStartButton();
    clickSubmit();
    clickNext();
    retakeQuiz();
}

$(createQuiz);