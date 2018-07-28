import capitalize from "lodash.capitalize";
import filesize from "rollup-plugin-filesize";
import { uglify } from "rollup-plugin-uglify";
import { minify } from "uglify-es";

import BaseConfig from "./rollup.config.base";
import { name, version, author } from "../package.json";

const banner = ` /*!
  * ${name}.js v${version}
  * (c) ${new Date().getFullYear()} ${typeof author === "object" ? author.name : author}
  * @license MIT
  */\n`;

export default [
  // .js, .cjs.js, .esm.js
  {
    ...BaseConfig,
    output: [
      // umd development version
      {
        file: `dist/${name}.js`,
        format: "umd",
        name: capitalize(name),
        banner
      },
      // cjs and esm version
      {
        file: `dist/${name}.cjs.js`,
        format: "cjs",
        banner
      },
      // cjs and esm version
      {
        file: `dist/${name}.esm.js`,
        format: "es",
        banner
      }
    ],
    plugins: [...BaseConfig.plugins, filesize()]
  },

  // .min.js
  {
    ...BaseConfig,
    output: [
      // umd with compress version
      {
        file: `dist/${name}.min.js`,
        format: "umd",
        name: capitalize(name)
      }
    ],
    plugins: [
      ...BaseConfig.plugins,
      uglify(
        {
          compress: { drop_console: true },
          output: { preamble: banner } // add banner
        },
        minify
      ),
      filesize()
    ]
  }
];
