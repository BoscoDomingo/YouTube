// Mixed import
import process, { env } from "node:process";

env.MY_VAR = "myVar";
// Both work - they reference the same thing
console.log(env.MY_VAR);
console.log(process.env.MY_VAR);

// Import statements are executed BEFORE any other code (they are "hoisted").
import exportedDefaultFunction, { exportedFunction } from "./assets/myModule.js"; // This import happens before the console.log(env.MY_VAR)

console.log(exportedDefaultFunction());
console.log(exportedFunction());

await import("./assets/myModule.js") // This is executed after the console.log(env.MY_VAR)