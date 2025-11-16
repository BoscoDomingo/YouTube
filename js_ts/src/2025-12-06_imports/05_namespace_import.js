// Namespace import
import * as myExports from "./assets/myExports.js";
import * as process from "node:process";

console.log(myExports.default()); // Default export is accessed as 'default' property
console.log(myExports.exportedFunction()); // All other exports preserve their original names

process.default.on("beforeExit", () => {
    console.log("Before Exit");
});
console.log(process.default.env.USER);