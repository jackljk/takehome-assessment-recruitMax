const theme = {
  container: {
    center: true,
    padding: {
      DEFAULT: "2rem",
      md: "4rem",
      lg: "6rem",
      xl: "8rem",
    },
    screens: {
      "2xl": "1360px",
    },
  },
  screens: {
    xs: "380px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  extend: {
    fontFamily: {
      sans: [
        "var(--font-mada)",
        "var(--font-geist-sans)",
        "system-ui",
        "sans-serif",
      ],
      mono: ["var(--font-geist-mono)", "monospace"],
      mada: ["var(--font-mada)", "sans-serif"],
    },
    colors: {
      "brand-primary": {
        50: "var(--color-brand-primary-50)",
        100: "var(--color-brand-primary-100)",
        200: "var(--color-brand-primary-200)",
        300: "var(--color-brand-primary-300)",
        400: "var(--color-brand-primary-400)",
        500: "var(--color-brand-primary-500)",
        600: "var(--color-brand-primary-600)",
        700: "var(--color-brand-primary-700)",
        800: "var(--color-brand-primary-800)",
        900: "var(--color-brand-primary-900)",
      },
      "brand-secondary": {
        50: "var(--color-brand-secondary-50)",
        100: "var(--color-brand-secondary-100)",
        200: "var(--color-brand-secondary-200)",
        300: "var(--color-brand-secondary-300)",
        400: "var(--color-brand-secondary-400)",
        500: "var(--color-brand-secondary-500)",
        600: "var(--color-brand-secondary-600)",
        700: "var(--color-brand-secondary-700)",
        800: "var(--color-brand-secondary-800)",
        900: "var(--color-brand-secondary-900)",
      },
    },
  },
};

const config = {
  theme,
};

export default config;
