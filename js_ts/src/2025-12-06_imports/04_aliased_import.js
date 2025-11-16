// Aliased import
import { env as ENV } from "node:process";
import { exportedFunction as exportedFunction2Alias } from "./assets/myExports.js";

console.log(ENV.MY_VAR);
console.log(exportedFunction2Alias());
