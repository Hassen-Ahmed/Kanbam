import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

beforeEach(() => {
  // will clear mock history
  vi.clearAllMocks();

  // manual mocking of localStorage
  // will create localStorage property to window object
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    },
    writable: true,
  });
});

afterEach(() => {
  // e.g, clearing jsdom
  cleanup();
});
