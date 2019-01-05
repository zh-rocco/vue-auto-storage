module.exports = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
  globals: {
    window: true,
  },
};
