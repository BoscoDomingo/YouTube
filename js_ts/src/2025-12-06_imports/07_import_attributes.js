// Import attributes
import config from "./assets/config.json" with { type: "json" };

console.log(config.name);
console.log(config.someNumber); // Has type-checking and autocomplete!
config.someString = "a"
console.log(config.someString); // Doesn't fail for non-existent properties though

import styles from "./assets/stylesheet.css" with { type: "css" }; // Node, Deno don't support it, Bun kinda
console.log(styles);