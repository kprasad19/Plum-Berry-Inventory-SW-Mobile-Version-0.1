import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import path from "path";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({
      babelConfig: {
        presets: ['@babel/preset-react']
      },
      filter: (id) => {
        return /node_modules\/(react-native|@react-native|@expo)/.test(id) && 
               /\.(js|jsx|ts|tsx)$/.test(id);
      }
    })
  ],
  base: "./",
  resolve: {
    alias: [
      {
        find: /^react-native$/,
        replacement: 'react-native-web'
      },
      {
        find: /^react-native-svg$/,
        replacement: 'react-native-web-svg'
      }
    ]
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  },
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
});
