import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

beforeEach(() => {
  // will clear mock history
  vi.clearAllMocks();
});

afterEach(() => {
  // e.g, clearing jsdom
  cleanup();
});
