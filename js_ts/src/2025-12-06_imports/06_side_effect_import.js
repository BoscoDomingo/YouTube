// Side-effect import
import "./assets/myModule.js"; // Prints a message we want, including the value of the MY_VAR environment variable


// ALWAYS add a comment to explain why that import is there.



// Order matters - imports are executed in the order they appear, and they may call their own imports too.

import process from "node:process";
import "dotenv/config"; // Load environment variables from .env file

console.log(`\n${process.env.MY_VAR}\n`); // All good
