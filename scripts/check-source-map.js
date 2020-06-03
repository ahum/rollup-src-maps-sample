const sm = require("source-map");
const fs = require("fs-extra");
const { resolve } = require("path");
const LinesAndColumns = require("lines-and-columns").default;

const run = async () => {
  const m = await fs.readJson(resolve(__dirname, "../lib/index.js.map"));

  const gen = await fs.readFile(resolve(__dirname, "../lib/index.js"), "utf8");
  const src = await fs.readFile(resolve(__dirname, "../src/index.js"), "utf8");

  return sm.SourceMapConsumer.with(m, null, (consumer) => {
    // console.log("consumer", consumer);

    const genLc = new LinesAndColumns(gen);
    const srcLc = new LinesAndColumns(src);
    consumer.eachMapping((m) => {
      console.log(m);
      const i = genLc.indexForLocation({
        line: m.generatedLine - 1,
        column: m.generatedColumn,
      });
      const s = srcLc.indexForLocation({
        line: m.originalLine - 1,
        column: m.originalColumn,
      });
      console.log("i:", i, "s", s);
      console.log("GEN: ", gen.substring(i, 20)); //, "->", src.substring(s, 10));
      console.log("SRC: ", src.substring(s, 20)); //, "->", src.substring(s, 10));
      // console.log(gen.substring(i, 10), "->", src.substring(s, 10));
    });
    return true;
  });
};

run()
  .then((r) => console.log(r))
  .catch((e) => console.error(e));
