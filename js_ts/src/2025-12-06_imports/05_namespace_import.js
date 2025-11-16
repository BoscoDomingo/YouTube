// Namespace import
import * as myExports from "./assets/myModule.js";
import * as process from "node:process";

console.log(myExports.default()); // Default export is accessed as 'default' property
console.log(myExports.exportedFunction()); // All other exports preserve their original names

process.default.on("beforeExit", () => {
    console.log("Before Exit");
});
console.log(process.default.env.USER);

// You can always extract the default and play with it directly
// But it's one extra step
const { default: processDef } = process

processDef.env.MY_VAL = "something"

console.log(process.default.env.MY_VAL);