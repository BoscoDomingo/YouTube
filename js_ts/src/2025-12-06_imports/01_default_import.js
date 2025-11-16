// Default import
import process from "node:process";
import exportedDefaultFunction from "./assets/myModule.js";

console.log(exportedDefaultFunction());

process.on("beforeExit", () => {
    console.log("Before Exit");
});