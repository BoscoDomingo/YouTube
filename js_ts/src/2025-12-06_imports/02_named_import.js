// Named import
import { exportedFunction } from "./assets/myModule.js";

// import { on } from "node:process"; // This fails since `on` is not exported, but is available in the `process` object

// These are equivalent:
// import { default as exportedDefaultFunction } from "./assets/myModule.js";
// import exportedDefaultFunction from "./assets/myModule.js";

console.log(exportedFunction());