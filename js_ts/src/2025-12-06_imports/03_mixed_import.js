// Mixed import
import process, { env } from "node:process";

env.MY_VAR = "myVar";
// Both work - they reference the same thing
console.log(env.MY_VAR);
console.log(process.env.MY_VAR);

import exportedDefaultFunction, { exportedFunction } from "./assets/myExports.js"; // This import happens before the console.log(env.MY_VAR)

console.log(exportedDefaultFunction());
console.log(exportedFunction());