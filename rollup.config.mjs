import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import image from "@rollup/plugin-image";
import externals from "rollup-plugin-node-externals";
import del from "rollup-plugin-delete";
import copy from "rollup-plugin-copy";
import postcss from "rollup-plugin-postcss";
import { readFileSync } from "fs";
const pkg = JSON.parse(readFileSync("./package.json", { encoding: "utf8" }));

export default [
  {
    input: "./src/index.ts",
    plugins: [
      image(),
      del({ targets: "build/*" }),
      externals({ deps: true }),
      nodeResolve({
        extensions: [".js", ".ts", ".tsx"],
      }),
      commonjs(),
      postcss({
        config: {
          path: "./postcss.config.js",
        },
        minimize: true,
        modules: false,
        extract: "styles.css",
      }),
      babel({
        babelHelpers: "runtime",
        skipPreflightCheck: true,
        exclude: "*/node_modules/*",
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
    ],
    output: [
      { dir: pkg.main, format: "cjs" },
      { dir: pkg.module, format: "es" },
    ],
  },
  {
    input: "build/index.esm.js/index.js",
    plugins: [
      copy({
        targets: [{ src: "build/index.esm.js/styles.css", dest: "build" }],
        verbose: true,
        hook: "buildStart",
      }),
      del({
        targets: [
          "build/index.cjs.js/styles.css",
          "build/index.esm.js/styles.css",
        ],
        verbose: true,
        hook: "buildEnd",
      }),
    ],
  },
];
