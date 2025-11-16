// Named import
import { exportedFunction } from "./assets/myExports.js";
// import { on } from "node:process"; // This fails since `on` is not exported, but is available in the `process` object

console.log(exportedFunction());