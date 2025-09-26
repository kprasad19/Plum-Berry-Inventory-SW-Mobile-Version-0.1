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
      'react-native-svg': 'react-native-web-svg',
      'react-native/Libraries/Utilities/codegenNativeCommands': path.resolve(__dirname, 'node_modules/react-native-web/dist/modules/Utilities/codegenNativeCommands.js'),
      'react-native/Libraries/Image/AssetSourceResolver': path.resolve(__dirname, 'node_modules/react-native-web/dist/modules/Image/AssetSourceResolver.js'),
      'react-native/Libraries/Image/AssetRegistry': path.resolve(__dirname, 'node_modules/react-native-web/dist/modules/Image/AssetRegistry.js'),
      'react-native/Libraries/ReactNative/AppContainer': path.resolve(__dirname, 'node_modules/react-native-web/dist/modules/ReactNative/AppContainer.js'),
      'react-native/Libraries/Image/resolveAssetSource': path.resolve(__dirname, 'node_modules/react-native-web/dist/modules/Image/resolveAssetSource.js'),
      'react-native/Libraries/Utilities/codegenNativeComponent': path.resolve(__dirname, 'node_modules/react-native-web/dist/modules/Utilities/codegenNativeComponent.js')
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
