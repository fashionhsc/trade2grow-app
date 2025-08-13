/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#8D60EE',
        secondary: '#22C55E',
        background: '#8D60EE',
        textPrimary:'#8D60EE',
        textSecondary:'#B9B4E4',
        danger: '#EF4444',
        success: '#10B981',
        warning: '#F59E0B',
        NeutralGray: '#E6E6E6',
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

