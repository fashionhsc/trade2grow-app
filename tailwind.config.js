/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#22C55E',
        background: '#FFD700',
        text: '#1F2937',
        buttonPrimary: 'FFD700',
        buttontext: 'FFD700',
        borderColor: '#FFD700',
        danger: '#EF4444',
        success: '#10B981',
        warning: '#F59E0B',
      },
      borderRadius: {
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
      }
    },
  },
  plugins: [],
}

