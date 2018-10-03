module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: true,
  cursorOffset: -1,
  insertPragma: false,
  jsxBracketSameLine: false,
  printWidth: 80,
  proseWrap: 'preserve',
  requirePragma: false,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
  ],
};
