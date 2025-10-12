// =============================================================================
// Limitation 1: `as const` on dynamic data
// =============================================================================

// A 'const' assertion can only be applied to references to enum members, or string, number, boolean, array, or object literals.
new Date().toISOString() as const;





// =============================================================================
// Limitation 1.5: Working with External APIs (Dynamic Data)
// =============================================================================

/**
 * You can't use `as const` with data from external sources because:
 * - JSON.parse() returns unknown/any
 * - API responses are dynamic
 * - Values aren't known at compile time
 */

type APIResponse = {
	userId: string,
	username: string,
	roles: string[]
};

// ❌ This doesn't make sense
function fetchUser(): APIResponse {
	const response = JSON.parse(
		'{"userId": 1, "username": "john", "roles": ["admin"]}',
	);
	return response as const satisfies APIResponse; // Can't use `as const` on dynamic data
	return response satisfies APIResponse; // Must use type assertion here or runtime validation. `satisfies` won't work
}

// ✅ Solution: Validate at runtime with a library like Zod
import { z } from "zod";

const UserSchema = z.object({
	userId: z.UUID(),
	username: z.string(),
	roles: z.array(z.string()),
});

function fetchUserSafe(jsonString: string) {
	const parsed = JSON.parse(jsonString);
	return UserSchema.parse(parsed); // Runtime validation
}













// =============================================================================
// Limitation 2: Arrays Become Readonly Tuples
// =============================================================================

type Config = {
	allowedRoles: string[];
};

// With `as const`, arrays become readonly tuples
const config = {
	allowedRoles: ["admin", "user", "guest"],
} as const satisfies Config;
config.allowedRoles; // is a tuple, not an array

config.allowedRoles.push("moderator"); // Error: Property 'push' does not exist
config.allowedRoles[0] = "superadmin"; // Error: Cannot assign to '0' because it is a read-only property

// If you need mutable arrays, use `satisfies` without `as const`
const configMutable = {
	allowedRoles: ["admin", "user", "guest"],
} satisfies Config;

configMutable.allowedRoles.push("moderator");

// Or use type annotation
const configTyped: Config = {
	allowedRoles: ["admin", "user", "guest"],
};













// =============================================================================
// Limitation 3: Can't Use with Computed Property Names
// =============================================================================

const key = "dynamicKey";

// ❌ This doesn't work as expected
const obj = {
	[key]: "value",
} as const;
// Not { readonly dynamicKey: "value" }
















// =============================================================================
// Limitation 4: Doesn't work with functions
// =============================================================================
type APICall = () => Promise<APIResponse>

async function aCallToAPI() {
	return {
		roles: ["DOESN'T EXIST"],
		userId: true,
		extraField: true
	}
} satisfies APICall















// =============================================================================
// When to use `as const satisfies`
// =============================================================================

/**
 * ✅ By default until you need mutability or looser types.
 *
 * Remember you can apply as const at the property level too!
 *
 * DON'T use `as const satisfies` when:
 *
 * 1. ❌ Working with dynamic/external data (API responses, JSON.parse)
 * 2. ❌ You need mutability
 * 3. ❌ Working with computed property names
 * 4. ❌ Defining functions/handlers (doesn't work)
 */