module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // 1️⃣  Alias "@/…" → "./src"
      [
        'module-resolver',
        {
          root: ['./'],
          alias: { '@': './src' },
          extensions: ['.ios.tsx', '.android.tsx', '.tsx', '.ts', '.js', '.json']
        }
      ],

      // 2️⃣  Inyecta variables definidas en tiempo de bundler
      'transform-inline-environment-variables',

      // 3️⃣  React-Native-Reanimated (siempre el *último*)
      'react-native-reanimated/plugin',
    ]
  };
};
