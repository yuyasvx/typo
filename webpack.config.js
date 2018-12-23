const MinifyPlugin = require('babel-minify-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const PRODUCTION = process.env.NODE_ENV === 'production';
const PLUGIN_PRODUCTION = [new MinifyPlugin()];

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: PRODUCTION ? 'production' : 'development',
  devtool: PRODUCTION ? '' : 'source-map',
  target: 'electron-main',
  externals: [nodeExternals()],
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: './src/main/main.ts',
  output: {
    path: `${__dirname}/dist/main`,
    filename: 'main.js'
  },
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: 'ts-loader'
      }
    ]
  },
  // import 文で .ts ファイルを解決するため
  resolve: {
    extensions: ['.ts']
  },
  plugins: PRODUCTION ? PLUGIN_PRODUCTION : []
};
