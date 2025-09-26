import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({
      babelConfig: {
        presets: ['@babel/preset-flow', '@babel/preset-react']
      },
      filter: (id) => {
        return /node_modules\/(react-native|@react-native|@expo)/.test(id) && 
               /\.(js|jsx|ts|tsx)$/.test(id);
      }
    })
  ],
  base: "./",
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      'react-native-svg': 'react-native-web-svg'
    }
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
