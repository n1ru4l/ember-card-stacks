'use strict';

module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: `module`
    },
    extends: `eslint:recommended`,
    env: {
        browser: true
    },
    rules: {
        'indent': [`error`, 2],
        'quotes': [`error`, `backtick`, {
            'avoidEscape': true
        }],
        'semi': [`error`, `always`],
        'prefer-const': [`error`],
        'comma-dangle': [`error`, `always-multiline`],
        'object-curly-spacing': [`error`, `always`],
        'array-bracket-spacing': [`error`, `always`, {
            'objectsInArrays': false,
        }],
    },
};
