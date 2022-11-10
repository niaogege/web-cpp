import { readFile, writeFile } from "fs-extra";

const file = await readFile("./src/App.vue");
const { descriptor, error } = file;
console.log(descriptor, "descriptor");
