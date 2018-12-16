module.exports = {
  baseUrl: "./",
  outputDir: "dist/view",
  chainWebpack: config => {
    // webpack ビルドの設定を上書き(https://forum.vuejs.org/t/how-can-i-create-two-separate-bundles-with-vue-cli-3/30353)
    // 詳細は：https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md

    // デフォルトのエントリーポイントの定義を消す
    config.entryPoints.delete("app");

    // 新しいパスで定義し直す
    config
      .entry("app")
      .add("./src/view/main.ts")
      .end();
  }
};

/* 詳細はここ： https://github.com/vuejs/vue-cli/blob/9040df84cb6f98b9665d957d0242f1a6075bad37/docs/config.md */
