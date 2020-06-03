import sucrase from "@rollup/plugin-sucrase";
import { createFilter } from "@rollup/pluginutils";
import virtual from "@rollup/plugin-virtual";
import { terser } from "rollup-plugin-terser";
import minimist from "minimist";
import * as recast from "recast";

const b = recast.types.builders;

export const tp = (options) => {
  const filter = createFilter("**/index.js");

  return {
    name: "tp-plugin",
    transform(code, id) {
      if (!filter(id)) {
        return null;
      }
      console.log("JUST PARSE AND PRINT:", id);
      const ast = recast.parse(code, { parser: this, sourceFileName: id });
      const r = recast.print(ast, { sourceMapName: `${id}.map` });
      // return nullnull;
      return { code: r.code, map: r.map };
    },
  };
};

const args = {
  sucrase: true,
  terser: true,
  tp: true,
  ...minimist(process.argv.slice(2)),
};
console.log("args:", args);

const plugins = [
  virtual({
    react: `
  
    export const createElement = () => ({})  

    export default {createElement}

  `,
  }),
  args.tp && tp(),
  args.sucrase && sucrase({ transforms: ["jsx"] }),
  args.terser && terser(),
].filter((p) => !!p);
// const plugins = [tp(), args.terser && terser()].filter((p) => !!p);
// const tp = () => ({
//   name: "just-a-test-plugin",
//   transform: function (code, id) {
//     return null;
//   },
// });

export default {
  input: "src/index.jsx",
  plugins,
  output: {
    dir: "lib",
    sourcemap: true,
    format: "esm",
  },
};
