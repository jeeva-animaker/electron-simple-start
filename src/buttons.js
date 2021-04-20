export const operators = [
    '+',
    '-',
    '*',
    '/'
]

export const buttonGrid = [
    [
        {
            text: 'Rad',
        },
        {
            text: 'Deg'
        },
        {
            text: 'x!'
        },
        {
            text: '(',
            role: 'openFunc',
            value: '('
        },
        {
            text: ')',
            role: 'closeFunc',
            value: ')'
        },
        {
            text: '%',
            role: 'operator',
            value: '%'
        },
        {
            text: ({ isSubmitted }) => isSubmitted ? 'AC' : 'CE',
            role: 'clear'
        }
    ],
    [
        {
            text: 'Inv'
        },
        {
            text: 'sin'
        },
        {
            text: 'ln'
        },
        {
            text: '7',
            buttonProps: {
                variant: 'light'
            },
            role: 'number',
            value: '7'
        },
        {
            text: '8',
            buttonProps: {
                variant: 'light'
            },
            role: 'number',
            value: '8'
        },
        {
            text: '9',
            buttonProps: {
                variant: 'light'
            },
            role: 'number',
            value: '9'
        },
        {
            text: '÷',
            role: 'operator',
            value: '/'
        }
    ],
    [
        {
            text: 'π'
        },
        {
            text: 'cos'
        },
        {
            text: 'log'
        },
        {
            text: '4',
            buttonProps: {
                variant: 'light'
            },
            role: 'number',
            value: '4'
        },
        {
            text: '5',
            buttonProps: {
                variant: 'light'
            },
            role: 'number',
            value: '5'
        },
        {
            text: '6',
            buttonProps: {
                variant: 'light'
            },
            role: 'number',
            value: '6'
        },
        {
            text: '×',
            role: 'operator',
            value: '*'
        }
    ],
    [
        {
            text: 'e'
        },
        {
            text: 'tan'
        },
        {
            text: '√ '
        },
        {
            text: '1',
            buttonProps: {
                variant: 'light'
            },
            role: 'number',
            value: '1'
        },
        {
            text: '2',
            buttonProps: {
                variant: 'light'
            },
            role: 'number',
            value: '2'
        },
        {
            text: '3',
            buttonProps: {
                variant: 'light'
            },
            role: 'number',
            value: '3'
        },
        {
            text: '-',
            role: 'operator',
            value: '-'
        }
    ],
    [
        {
            text: 'Ans'
        },
        {
            text: 'EXP'
        },
        {
            text: 'x<sup>y</sup>'
        },
        {
            text: '0',
            buttonProps: {
                variant: 'light'
            },
            role: 'number',
            value: '0'
        },
        {
            text: '.',
            buttonProps: {
                variant: 'light'
            },
            role: 'decimalPoint',
            value: '.'
        },
        {
            text: '=',
            buttonProps: {
                variant: 'primary'
            },
            role: 'submit'
        },
        {
            text: '+',
            role: 'operator',
            value: '+'
        }
    ]
]