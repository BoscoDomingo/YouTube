// =============================================================================
// Example 1: API Routes
// =============================================================================

const ENDPOINTS = ["/users", "/products"] as const;
const HTTP_METHODS = {
	get: "GET",
	post: "POST",
} as const;

type GetRoute = {
	path: (typeof ENDPOINTS)[number];
	method: (typeof HTTP_METHODS)["get"];
};

type PostRoute = {
	path: (typeof ENDPOINTS)[number];
	method: (typeof HTTP_METHODS)["post"];
	payload: Record<string, unknown>;
};

type Route = GetRoute | PostRoute;
// Same as:
/*
type Route = {
	path: string;
} & (
	{
		method: "GET";
	} | {
		method: "POST";
		payload: Record<string, unknown>;
	}
);
*/

// Type annotation widens everything
const routeTypeAnnotation: Route = {
	path: "/users",
	method: "POST",
	payload: { name: "John Doe", email: "john.doe@example.com" },
};
routeTypeAnnotation.method = "GET"; // `method` and `path` are protected by the type
routeTypeAnnotation.payload // But payload isn't really typed, it's just `Record<string, unknown>`

// `as const` has no validation
const routeConst = {
	path: "/users",
	method: "INVALID", // No error - TypeScript doesn't check!
	extraField: "oops",
} as const;


const routeSatisfies = {
	path: "/users",
	method: "POST",
	payload: { name: "John Doe", email: "john.doe@example.com" },
	// extraField: "oops", // Error: Object literal may only specify known properties
} satisfies Route;
// Correctly validates if payload is needed
// But payload values are only `string`, not the actual values

const routeAsConstSatisfies = {
	path: "/users",
	method: "POST",
	payload: { name: "John Doe", email: "john.doe@example.com" },
} as const satisfies Route;
// Now even the payload values are narrowed to the actual values

const routeMap = {
	getUsers: {
		path: "/users",
		method: "GET",
	},
	createUser: {
		path: "/users",
		method: "POST",
		payload: { name: "string", email: "string" },
	},
	updateUser: {
		path: "/products",
		method: "POST",
		payload: { name: "string", price: 100 },
	},
} as const satisfies Record<string, Route>;

app.post(routeMap.createUser.path);
































// =============================================================================
// Example 2: Configuration Objects with Feature Flags
// =============================================================================

type Config = {
	features: Record<string, boolean>;
	metadata?: Record<string, unknown>;
};

const configTypeAnnotation: Config = {
	features: {
		darkMode: true,
		analytics: false,
		betaFeatures: true,
	},
	metadata: {
		version: "1.0.0",
		buildDate: new Date().toISOString(),
		baseURL: process.env.BASE_URL,
	},
};

configTypeAnnotation.features.darkMode; // No autocomplete. TS doesn't know which features are available
configTypeAnnotation.metadata?.baseURL; // This may be undefined

const configAsConstSatisfies = {
	features: {
		darkMode: true,
		analytics: false,
		betaFeatures: true,
	},
	metadata: {
		version: "1.0.0",
		buildDate: new Date().toISOString(),
		baseURL: process.env.BASE_URL,
	},
} as const satisfies Config;

configAsConstSatisfies.features.darkMode; // Autocomplete works for specific features
configAsConstSatisfies.metadata?.baseURL;
























// =============================================================================
// Example 3: Theme Tokens with Template Literal Types
// =============================================================================

// type ColorValue = `#${string}` | `rgb(${string})` | `hsl(${string})`;
type SpacingValue = `${number}rem` | `${number}px`;

type ThemeColor = "primary" | "secondary" | "danger" | "success";
type Spacing = "xs" | "sm" | "md" | "lg" | "xl";
type Breakpoint = "mobile" | "tablet" | "desktop" | "wide";

type Theme = {
	colors: {
		[K in ThemeColor]: `#${string}` | `rgb(${string})` | `hsl(${string})`;
	};
	spacing: {
		[K in Spacing]: SpacingValue;
	};
	breakpoints: {
		[K in Breakpoint]: `${number}px`;
	};
};

const theme: Theme = {
	colors: {
		primary: "#3b82f6",
		secondary: "#8b5cf6",
		danger: "#ef4444",
		success: "#10b981",
	},
	spacing: {
		xs: "0.25rem",
		sm: "0.5rem",
		md: "1rem",
		lg: "2rem",
		xl: "4rem",
	},
	breakpoints: {
		mobile: "640px",
		tablet: "768px",
		desktop: "1024px",
		wide: "1280px",
	},
};
theme.colors.primary // has type: ColorValue (union type), not the specific value "#3b82f6"
theme.spacing.lg


const themeAsConst = {
	colors: {
		primary: "#3b82f6",
		secondary: "#8b5cf6",
		danger: "#ef4444",
		success: "#10b981",
	},
	spacing: {
		xs: "0.25rem",
		sm: "0.5rem",
		md: "1rem",
		lg: "2rem",
		xl: "4rem",
	},
	breakpoints: {
		mobile: "640px",
		tablet: "768px",
		desktop: "1024px",
		wide: "1280px",
	},
} as const satisfies Theme;
themeAsConst.colors.primary // is "#3b82f6" (exact literal)
themeAsConst.spacing.lg