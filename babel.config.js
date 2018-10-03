module.exports = api => {
  api.cache(false);
  return {
    presets: ['habitual'],
    plugins: [
      [
        'babel-plugin-import',
        {
          libraryName: 'antd',
          libraryDirectory: 'lib',
          style: true,
        },
      ],
    ],
  };
};
