const program = require('commander');
const path = require('path');
const fs = require('fs-extra');
const cwd = process.cwd();
const chalk = require('chalk');
const shelljs = require('shelljs');
const portfinder = require('portfinder');
const isWindows = require('is-windows');

const isWin = isWindows();

module.exports = function(args) {
  const projectServerPort = args[3] || '';
  let isStatic = false;
  if (!/\d/.test(projectServerPort)) {
    isStatic = true;
  }

  const configFilePath = path.join(cwd, './mockers/index.js');
  let noFile = false;

  try {
    const result = fs.readFileSync(configFilePath);
    if (!result) {
      noFile = true;
    }
  } catch (e) {
    noFile = true;
  }
  if (noFile) {
    console.log(chalk.red('There is no `./mockers/index.js` file.'));
    return;
  }

  // 1. 创建临时文件夹
  const tempDir = path.join(cwd, './mockers-docs');
  const boilerplateDir = path.join(__dirname, '../boilerplate');

  process.on('exit', () => {});

  process.on('SIGINT', () => {
    fs.removeSync(tempDir);

    program.runningCommand && program.runningCommand.kill('SIGKILL');
    process.exit(0);
  });

  fs.ensureDirSync(tempDir);

  // 2. 移动模板到当前目录
  fs.copySync(boilerplateDir, tempDir, { overwrite: true });

  // 4. package.json
  const pkg = port => `{
  "name": "mockers-api-docs-boilerplate",
  "private": true,
  "scripts": {
    "start": "cross-env NODE_ENV=development babel-node ../server --port ${projectServerPort}",
    "build": "cross-env NODE_ENV=production webpack --config ../internals/webpack/webpack.prod.babel.js --color -p --progress --hide-modules"
  },
  "dependencies": {},
  "devDependencies": {}
}`;

  portfinder.getPort((err, port) => {
    fs.writeFileSync(path.join(tempDir, './package.json'), pkg(port), 'utf-8');

    // 3. 建立变量文件
    const configContent = `
module.exports = {
  port: "${projectServerPort}",
  docPort: "${projectServerPort}",
  isStatic: ${isStatic},
}
    `;

    fs.writeFileSync(
      path.join(tempDir, './app/config.js'),
      configContent,
      'utf-8',
    );

    if (projectServerPort) {
      const mockjsContent = `
const mockers = require('../../mockers/index');
module.exports = mockers;
  `;
      fs.writeFileSync(
        path.join(tempDir, './mockers/index.js'),
        mockjsContent,
        'utf-8',
      );
    }

    // 5. 启动
    process.chdir('mockers-docs');
    shelljs.ln('-sf', '../node_modules', 'node_modules');
    shelljs.exec('npm start', (code, stdout, stderr) => {
      if (err) {
        throw new Error(err);
      } else {
        console.log(stdout);
      }
    });
  });
};
