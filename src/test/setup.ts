import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

beforeEach(() => {
  vi.clearAllMocks;
});

afterEach(() => {
  // e.g, clearing jsdom
  cleanup();
});
