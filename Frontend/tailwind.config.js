/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Màu chính theo Figma Campus Marketplace AI
        primary: {
          50:  '#EBF4FF',
          100: '#D6E9FF',
          200: '#ADCFFF',
          500: '#3B82F6',
          600: '#1D6FD4',
          700: '#1557A0',   // Màu xanh chủ đạo (logo, nút CTA)
          800: '#0F3E73',
          900: '#0A2847',
        },
        campus: {
          blue:    '#1557A0',
          blueMid: '#1D6FD4',
          blueBg:  '#EBF4FF',
          sell:    '#1557A0',   // badge Bán
          give:    '#059669',   // badge Tặng (xanh lá)
          trade:   '#6B7280',   // badge Trao đổi
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
