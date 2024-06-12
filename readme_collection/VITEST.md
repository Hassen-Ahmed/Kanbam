## ⭐️ Testing ⭐️

### 🎯️ Installation

- We going to install other packages with vitest. We will use them with together vitest.

```js
    npm i -D vitest
	npm i -D jsdom @testing-library/react @testing-library/jest-dom
	npm i -D @testing-library/user-event
```

- In the above commands we installed certain packages
  - vitest
  - jsdom (for implementing browsers dom Api)
  - react-testing-library (for testing React components)
  - user-event (for event handling)

### 🎯️ Configuration

- tsconfig.json

```js

{
  "compilerOptions": {
    // ...
       "types": ["vitest/globals"],
  },

    "include": ["src", "**/*.ts", "**/*.tsx", "**/*.test.ts", "**/*.test.tsx"]
    // ...
}

```

- Create setup.ts file first before configure vite.config.ts which is looks like this:

```js
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  // e.g, clearing jsdom
  cleanup();
});
```

- vite.config.ts

```js
/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: "./src/test/setup.ts",
  },
});
```

- vite.config.ts

```js

  "scripts": {
    //...
    "test": "vitest"
  },

```

### 🎯️ Runing test

```js
    npm run test
```
