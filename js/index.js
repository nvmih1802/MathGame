const MAXTIME = 60;
const SCORESTEP = 1;
const INITSCORE = 0;

var checkCorrect = CheckAnswer.none;
var state = State.start;
var time = MAXTIME;
var score = 0;
var clearTimeRemaining;
var timeDisplayCorrect;
let answerArr = [];

const rounding = (x, y) => {
    if (x % y == 0) {
        return x;
    }
    let remainder = x % y;
    x += y - remainder;
    return x;
}

function getResult(x, y, operator) {
    let result;
    switch (operator) {
        case Enum.add.code:
            result = x + y;
            break;
        case Enum.minus.code:
            result = x - y;
            break;
        case Enum.multiple.code:
            result = x * y;
            break;
        case Enum.divide.code:
            result = x / y;
            break;
    }
    return result;
}

const getOperator = (operator) => {
    switch (operator) {
        case Enum.add.code:
            return Enum.add.value;
        case Enum.minus.code:
            return Enum.minus.value;
        case Enum.multiple.code:
            return Enum.multiple.value;
        case Enum.divide.code:
            return Enum.divide.value;
    }
}

const loadQuestion = (firstNum, secondNum, operator) => {
    let question = document.getElementById('question');
    if (state.code === State.reset.code) {
        question.innerHTML = firstNum + " " + getOperator(operator) + " " + secondNum;
    }
    else {
        question.innerHTML = '';
    }
}

const loadAnswer = (answer) => {
    let answers = document.getElementsByClassName('btn-answer');
    answerArr = [];
    if (state.code === State.reset.code) {
        while (answerArr.length < 4) {
            let num = Math.floor(Math.random() * 100);
            if (answerArr.indexOf(num) === -1) {
                answerArr.push(num);
            }
        }
        if (answerArr.indexOf(answer) === -1) {
            let index = Math.floor(Math.random() * 4);
            answerArr[index] = answer;
        }
    }
    if (answerArr.length === 0) {
        for (let i = 0; i < answers.length; i++) {
            answers[i].innerHTML = '';
        }
    }
    else {
        for (let i = 0; i < answers.length; i++) {
            answers[i].innerHTML = answerArr[i];
        }
    }
}

const loadTime = (time) => {
    document.getElementById('timeRemaining').innerHTML = `Time remaining: ${time} sec`;
}

const loadScore = (val) => {
    if (state.code === State.reset.code) {
        score += val;
    }
    else {
        score = val;
    }
    document.getElementById('score').innerHTML = `Score: ${score}`;
}

const loadState = (states) => {
    switch (states.code) {
        case State.start.code:
            state = State.reset;
            break;
        default:
            state = State.start;
            break;
    }
    document.getElementById('startGame').innerHTML = state.text;
}

const handleTimeRemaining = () => {
    if (state.code === State.reset.code) {
        clearTimeRemaining = setInterval(() => {
            time = time - 1;
            loadTime(time);
            if (time < 0) {
                loadTime(0);
                clearInterval(clearTimeRemaining);
                document.getElementById('modal').style.display = 'block';
                document.getElementById('viewScore').innerHTML = `GAME OVER <br> YOUR SCORE IS ${score}`;
                document.body.style.pointerEvents = "none";
            }
        }, 1000);
    }
}

const loadGame = () => {
    let firstNum = Math.floor(Math.random() * 100);
    let secondNum = Math.floor(Math.random() * 100);
    const operator = Math.floor(Math.random() * 4) + 1;
    if (operator === 4) {
        secondNum = Math.floor(Math.random() * 99) + 1;
        firstNum = rounding(firstNum, secondNum);
    }
    loadQuestion(firstNum, secondNum, operator);
    let result = getResult(firstNum, secondNum, operator);
    loadAnswer(result);
    loadScore(INITSCORE);
    handleClickAnswer(result);
}

const loadCorrectAndIncorrect = (corrects) => {
    let correctElement = document.getElementById('correct');
    correctElement.innerHTML = corrects.text;
    correctElement.setAttribute('style', `display: ${corrects.value}`);
    if (timeDisplayCorrect) {
        clearTimeout(timeDisplayCorrect);
    }
    timeDisplayCorrect = setTimeout(() => {
        corrects = CheckAnswer.none;
        correctElement.setAttribute('style', `display: ${corrects.value}`);
    }, 1000);
}

const choiceAnswer = (res, answer) => {
    if (res === answer) {
        loadScore(SCORESTEP);
        checkCorrect = CheckAnswer.correct;
        loadCorrectAndIncorrect(checkCorrect);
    }
    else {
        checkCorrect = CheckAnswer.incorrect;
        loadCorrectAndIncorrect(checkCorrect);
    }
}

const handleClickAnswer = (res) => {
    let answers = document.getElementsByClassName('btn-answer');
    for (let i = 0; i < answers.length; i++) {
        document.getElementsByClassName('btn-answer')[i].onclick = function () {
            if (state.code === State.reset.code) {
                choiceAnswer(res, answerArr[i]);
                loadGame();
            }
        }
    }
}

const handleClickStartAndReset = () => {
    document.getElementById('startGame').addEventListener('click', () => {
        loadState(state);
        clearInterval(clearTimeRemaining);
        time = MAXTIME;
        loadTime(time);
        checkCorrect = CheckAnswer.none;
        loadCorrectAndIncorrect(checkCorrect);
        loadGame();
        handleTimeRemaining();
    });
}

const startGame = () => {
    loadTime(time);
    handleClickStartAndReset();
}

startGame();

