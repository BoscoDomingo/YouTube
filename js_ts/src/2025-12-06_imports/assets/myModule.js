import path from "node:path";

export default function exportedDefaultFunction() {
	return "** 1 **";
}

export function exportedFunction() {
	return "** 2 **";
}

console.log("\nMy variable is: ", process.env.MY_VAR);
console.log(`\n**************** ${path.basename(import.meta.url)} loaded ****************\n`);