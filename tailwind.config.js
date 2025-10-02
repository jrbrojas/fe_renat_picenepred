/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        //'node_modules/flowbite-react/lib/esm/**/*.js'
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
    ],
    //darkMode: ["class", '[data-theme="dark"]'],
    theme: {
        extend: {
            colors: {
                cenepred: {
                    100: '#66b4c3',
                    200: '#329baf',
                    300: '#00839B',
                    400: '#00687c',
                    500: '#004e5d',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'login-fondo':
                    "linear-gradient(to right bottom, rgba(108, 105, 105, 0.609), rgba(202, 207, 210, 1)), url('/src/assets/img/cenepred/cenepred.jpg')",
                'mapa-fondo':
                    //"linear-gradient(to right bottom, rgba(108, 105, 105, 0.609), rgba(202, 207, 210, 1)), url('/src/assets/img/cenepred/cenepred-mapa.png')",
                    //"linear-gradient(to right bottom, rgba('#7ed56f',0.8), rgba('#28b485',0.8)), url('/src/assets/img/cenepred/cenepred-mapa.png')",
                    "linear-gradient(#F26101, #08AEEA), rgba(0,0,0,0.2)",
                'fondo-transparent': "rgba(0, 0, 0, 0.05)" /* 5% opacity */

            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        //require('flowbite/plugin'),
        require("daisyui"),
        //require('@tailwindcss/forms'),
    ],
    daisyui: {
        themes: ["light"],
    },
}

