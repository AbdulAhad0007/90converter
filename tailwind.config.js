/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        neonPink: '#ff0080',
        neonBlue: '#00f0ff',
        neonPurple: '#a020f0',
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(90deg, #ff0080, #00f0ff, #a020f0)',
      },
    },
  },
  plugins: [],
};
module.exports = {
  darkMode: 'class', 
  theme: {
    extend: {
    },
  },
  plugins: [],
}
module.exports = {
  darkMode: 'media',
  theme: {
    extend: {
    },
  },
  plugins: [],
}
module.exports = {
  theme: {
      extend: {
          colors: {
              basecolor: 'var(--base-color)',
              primarytext: 'var(--primary-text)',
              paratxt: 'var(--para-txt)',
              secondarytext: 'var(--secondary-text)',
              links: 'var(--links)',
              heading: 'var(--head-3)',
              cardbg :'var(--card-bg)',
              inputbg:'var(--input-bg)'
          },
      },
  },
  plugins: [],
};
