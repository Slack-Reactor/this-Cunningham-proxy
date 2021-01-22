/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // Indicates which provider should be used to instrument code for coverage
  // coverageProvider: 'v8',

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
  },
  // setupFilesAfterEnv: ['jest-enzyme'], //points to npm package
  setupFilesAfterEnv: ['./enzyme.config.js'], // points to config file (both options work)

  testEnvironment: 'enzyme',

  // preset: '@shelf/jest-mongodb',

  // Options that will be passed to the testEnvironment
  testEnvironmentOptions: {
    enzymeAdapter: 'react16',
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};
