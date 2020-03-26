const path = require("path");

module.exports = {
  // pluginOptions: {
  //   'style-resources-loader': {
  //     preProcessor: 'scss',
  //     patterns: [path.resolve(__dirname, "@/styles/app.scss")]
  //   }
  // },
  // enable debugging in Chrome:
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        styles: path.resolve(__dirname, './src/styles/') // relative to the location of the webpack config file!
      }
    }
  },
  
 
  // rules: {
  //   "vue/no-unused-vars": "off"
  // }

}
// vue.config.js
// module.exports = {
//   css: {
//     loaderOptions: {
//       // pass options to sass-loader
//       // @/ is an alias to src/
//       // so this assumes you have a file named `src/variables.sass`

//       // by default the `sass` option will apply to both syntaxes
//       // because `scss` syntax is also processed by sass-loader underlyingly
//       // but when configuring the `data` option
//       // `scss` syntax requires an semicolon at the end of a statement, while `sass` syntax requires none
//       // in that case, we can target the `scss` syntax separately using the `scss` option
//       scss: {
//         data: `@import "~@/styles/app.scss";`
//       }
//       // pass Less.js Options to less-loader
//     }
//   }
// }