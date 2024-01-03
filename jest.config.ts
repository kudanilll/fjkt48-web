import type { Config } from "jest";
import nextJest from "next/jest.js";
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  //testEnvironment: "jest-environment-jsdom",
  
  modulePaths: [
    "<rootDir>/src"
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/*.type.ts",
    "!**/node_modules/**",
    "!**/coverage/**",
    "!<rootDir>/.next/**",
    "!<rootDir>/*.config.js",
    "!<rootDir>/*.config.ts",
    "!<rootDir>/app/api/**"
  ],
  
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
  }
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);