// const rollup = require("rollup");
import { rollup as rollupAs } from "rollup";
const inputOptions = {
  input: "./src/index.js",
};

const outputOptionsList = [
  {
    dir: "dist/es",
    format: "esm",
    entryFileNames: "[name].[hash].cpp.js",
    chunkFileNames: "chunk-[hash].cpp.js",
    assetFileNames: "assets/[name]-[hash][extname]",
  },
  {
    dir: "dist/cjs",
    format: "cjs",
    entryFileNames: "[name].[hash].js",
    chunkFileNames: "chunk-[hash].js",
    assetFileNames: "assets/[name]-[hash][extname]",
  },
];

build();

async function build() {
  let bundle;
  let buildFailed = false;
  try {
    // create a bundle
    const bundle = await rollupAs(inputOptions);
    console.log(bundle, "BUNDLE");
    await generateOutputs(bundle);
  } catch (error) {
    buildFailed = true;
    console.error(error);
  }
  if (bundle) {
    await bundle.close();
  }
  process.exit(buildFailed ? 1 : 0);
}

async function generateOutputs(bundle) {
  for (const outputOptions of outputOptionsList) {
    const { output } = await bundle.generate(outputOptions);
    console.log(output, "output");
    // for (const chunkOrAsset of output) {
    //   if (chunkOrAsset.type === "asset") {
    //     console.log("Asset", chunkOrAsset);
    //   } else {
    //     console.log("Chunk", chunkOrAsset.modules);
    //   }
    // }
    await bundle.write(outputOptions);
  }
}
