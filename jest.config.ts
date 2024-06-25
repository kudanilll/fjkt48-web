import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  modulePaths: ["<rootDir>/src"],
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/*.type.ts",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!<rootDir>/.next/**",
    "!<rootDir>/*.config.{js,ts,mjs}",
  ],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jest-environment-jsdom",
  verbose: true,
};

export default createJestConfig(config);