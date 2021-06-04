const Enum = {
    add: {
        code: 1,
        value: '+'
    },
    minus: {
        code: 2,
        value: '-'
    },
    multiple: {
        code: 3,
        value: '*'
    },
    divide: {
        code: 4,
        value: '/'
    }
}

const State = {
    start: {
        code: 1,
        text: 'Start Game'
    },
    reset: {
        code: 2,
        text: 'Reset Game'
    }
}

const CheckAnswer = {
    correct: {
        code: 1,
        text: 'Correct',
        value: 'inline-block'
    },
    incorrect: {
        code: 2,
        text: 'Incorrect',
        value: 'inline-block'
    },
    none: {
        code: 3,
        text: '',
        value: 'none'
    }
}