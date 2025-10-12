/**
 * TYPE WIDENING: When TypeScript automatically expands a specific literal type
 * to a more general type.
 *
 * Examples:	"active" (literal) → string (widened)
 *            200 (literal) → number (widened)
 *          	true (literal) → boolean (widened)
 */

type CustomObject = Record<string, string | boolean>;

// Type annotation loosens the type
const obj: CustomObject = {
	key: "value", // No notion that this key exists
	boolean: true,
};
// } as const; // Even this is ignored, type doesn't change!

// We can change anything at will. TypeScript doesn't care because it "fits the type".
obj.key = "new value";
obj.boolean = false;
// Even add keys
obj.other = "123";



// With `as const`, we lock in the values. Glorious immutability
const objConst = {
	key: "value",
	boolean: true,
} as const;

objConst.key = "new value"; // Error: Cannot assign to 'key' because it is a read-only property.



// `satisfies` keeps the type "stricter" while still allowing changes. The values take preference over the type.
// It's asking: "hey, do these values fit the type?" without forcing it to be that type.
const objSatisfies = {
	key: "value",
	boolean: true,
	// other: 123 // Error: number is not assignable to string | boolean
} satisfies CustomObject;

objSatisfies.key = "new value";
// Booleans act weird with satisfies.
objSatisfies.boolean = false; // Error: Type 'false' is not assignable to type 'true'.
// And we lose the ability to add new keys.
objSatisfies.other = "123"; // Error: Property 'other' does not exist on type '{ key: string; }'.



// `as const satisfies` is the best of both worlds. Immutability + type checking.
const objConstSatisfies = {
	key: "value",
	boolean: true,
	// other: 123,
} as const satisfies CustomObject;

objConstSatisfies.other = "123"; // Error: Property 'other' does not exist on type '{ readonly key: "value"; readonly boolean: true; }'.



// Property-level immutability
const DIRECTIONS = {
	up: "0100" as const, // Done at the property level
	down: "0101",
	left: "0102",
	right: "0103",
};

DIRECTIONS.up = "DOWN"; // Error: Type '"DOWN"' is not assignable to type '"0100"'.
DIRECTIONS.down = "UP"; // No error

const DIRECTIONS_CONST = {
	up: "0100",
	down: "0101",
	left: "0102",
	right: "0103",
} as const;

DIRECTIONS_CONST.up = "DOWN"; // Error: Cannot assign to 'up' because it is a read-only property.


/**
 * Recap:
 * - :Type -> loosens the type
 * - as const -> immutability
 * - satisfies Type -> Type checking without type widening
 * - as const satisfies Type -> immutability + type checking
 */