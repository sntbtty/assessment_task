/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        colors: {
            'blue': '#131049',
            lime: colors.lime,
            red: colors.red
        },
        extend: {
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            }
        }
    },
    plugins: []
};