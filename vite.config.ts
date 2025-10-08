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
      },
      {
        find: /^react-native\/Libraries\/Utilities\/codegenNativeCommands$/,
        replacement: path.resolve(__dirname, 'node_modules/react-native-web/dist/modules/Utilities/codegenNativeCommands.js')
      },
      {
        find: /^react-native\/Libraries\/Image\/AssetSourceResolver$/,
        replacement: path.resolve(__dirname, 'node_modules/react-native-web/dist/modules/Image/AssetSourceResolver.js')
      },
      {
        find: /^react-native\/Libraries\/Image\/AssetRegistry$/,
        replacement: path.resolve(__dirname, 'node_modules/react-native-web/dist/modules/Image/AssetRegistry.js')
      },
      {
        find: /^react-native\/Libraries\/ReactNative\/AppContainer$/,
        replacement: path.resolve(__dirname, 'node_modules/react-native-web/dist/modules/ReactNative/AppContainer.js')
      },
      {
        find: /^react-native\/Libraries\/Image\/resolveAssetSource$/,
        replacement: path.resolve(__dirname, 'node_modules/react-native-web/dist/modules/Image/resolveAssetSource.js')
      },
      {
        find: /^react-native\/Libraries\/Utilities\/codegenNativeComponent$/,
        replacement: path.resolve(__dirname, 'node_modules/react-native-web/dist/modules/Utilities/codegenNativeComponent.js')
      },
      {
        find: /^react-native\/Libraries\/Components\/DrawerAndroid\/DrawerLayoutAndroid$/,
        replacement: path.resolve(__dirname, 'node_modules/react-native-web/dist/modules/View/index.js')
      },
      {
        find: /^react-native\/Libraries\/Image\/Image$/,
        replacement: path.resolve(__dirname, 'node_modules/react-native-web/dist/modules/Image/index.js')
      },
      {
        find: /^react-native\/Libraries\/Components\/ProgressBarAndroid\/ProgressBarAndroid$/,
        replacement: path.resolve(__dirname, 'node_modules/react-native-web/dist/modules/View/index.js')
      },
      {
        find: /^react-native\/Libraries\/Utilities\/Platform$/,
        replacement: path.resolve(__dirname, 'node_modules/react-native-web/dist/modules/Utilities/Platform/index.js')
      },
      {
        find: /^react-native\/Libraries\/Network\/RCTNetworking$/,
        replacement: path.resolve(__dirname, 'node_modules/react-native-web/dist/modules/Network/index.js')
      },
      {
        find: /^react-native\/Libraries\/Settings\/Settings$/,
        replacement: path.resolve(__dirname, 'node_modules/react-native-web/dist/modules/Settings/index.js')
      },
      {
        find: /^react-native\/Libraries\/Components\/ToastAndroid\/ToastAndroid$/,
        replacement: path.resolve(__dirname, 'node_modules/react-native-web/dist/modules/Alert/index.js')
      },
      {
        find: /^react-native\/Libraries\/StyleSheet\/PlatformColorValueTypes$/,
        replacement: path.resolve(__dirname, 'node_modules/react-native-web/dist/modules/StyleSheet/index.js')
      },
      {
        find: /^react-native\/Libraries\/Components\/AccessibilityInfo\/legacySendAccessibilityEvent$/,
        replacement: path.resolve(__dirname, 'node_modules/react-native-web/dist/modules/AccessibilityInfo/index.js')
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
