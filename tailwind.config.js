/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Pre-included NativeWind content is handled by nativewind preset usually, 
    // but explicitly stating content is good practice.
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                background: '#0d1117',
                surface: '#161b22',
                habit: {
                    0: '#161b22', // Empty
                    1: '#0e4429', // Low
                    2: '#006d32', // Medium
                    3: '#26a641', // High
                    4: '#39d353', // Max
                }
            }
        },
    },
    plugins: [],
}
