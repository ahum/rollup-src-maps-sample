import sucrase from "@rollup/plugin-sucrase";

export default {
  input: "src/index.js",
  plugins: [sucrase({ transforms: ["jsx"] })],
  output: {
    dir: "lib",
    sourcemap: true,
    format: "esm",
  },
};
