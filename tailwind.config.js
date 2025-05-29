/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors'); // Импортируем стандартные цвета

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class', // Убедимся, что темный режим управляется классом
  theme: {
    extend: {
      colors: {
        // Здесь можно будет добавить кастомные цвета
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'), // Приятный серый для светлой темы
            a: {
              color: theme('colors.indigo.600'),
              '&:hover': {
                color: theme('colors.indigo.700'),
              },
            },
            strong: {
              color: theme('colors.gray.800'),
            },
            // Можно добавить другие элементы: h1, h2, li, blockquote и т.д.
          },
        },
        invert: { // Стили для .prose-invert (темная тема)
          css: {
            color: theme('colors.gray.200'), // Светло-серый для темной темы
            a: {
              color: theme('colors.indigo.400'),
              '&:hover': {
                color: theme('colors.indigo.300'),
              },
            },
            strong: {
              color: theme('colors.gray.100'),
            },
            // Можно добавить другие элементы
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Добавляем плагин
  ],
} 