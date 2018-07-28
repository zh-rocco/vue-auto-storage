import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { eslint } from "rollup-plugin-eslint";
import babel from "rollup-plugin-babel";

export default {
  input: "src/index.js",
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
    }),
    resolve(),
    commonjs(),
    eslint({
      include: ["src/**/*.js"]
    }),
    babel({
      runtimeHelpers: true,
      externalHelpers: true,
      exclude: "node_modules/**" // only transpile our source code
    })
  ]
};
