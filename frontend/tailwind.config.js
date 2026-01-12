/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: {
                    primary: '#0A0A0F',
                    secondary: '#18181B',
                    elevated: '#1F1F23',
                },
                brand: {
                    primary: '#6366F1',
                    secondary: '#EC4899',
                    tertiary: '#8B5CF6',
                },
                status: {
                    success: '#10B981',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
