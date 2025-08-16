import daisyui from "daisyui";
import daisyuiThemes from "daisyui/theme";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    daisyui,
    daisyuiThemes({
      themes: [
        "light",
        "cupcake",
        "dark",
        "night"
      ],
      defaultTheme: "light",      // default on first load
      preferDarkTheme: "dark",    // if system prefers dark
    }),
  ],
};