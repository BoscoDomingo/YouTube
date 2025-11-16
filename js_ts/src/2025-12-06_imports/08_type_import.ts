import React from "react";
import type MyComponent from "./assets/MyComponent.js";

/** @see {@link MyComponent} */
const MyComponentLazy = React.lazy(() => import("./assets/MyComponent.js"));
// You can now easily navigate to the source file whilst also keeping a reference in the component itself.