import capitalize from "lodash.capitalize";
import filesize from "rollup-plugin-filesize";
import { uglify } from "rollup-plugin-uglify";
import { minify } from "uglify-es";

import BaseConfig from "./rollup.config.base";
import { name, version, author } from "../package.json";

const capitalizeName = name
  .split("-")
  .map(val => capitalize(val))
  .join("");

const banner = ` /*!
  * ${name}.js v${version}
  * (c) ${new Date().getFullYear()} ${typeof author === "object" ? author.name : author}
  * @license MIT
  */\n`;

export default [
  {
    ...BaseConfig,
    output: [
      // umd with compress version
      {
        file: `dist/${name}.js`,
        format: "umd",
        name: capitalizeName
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
