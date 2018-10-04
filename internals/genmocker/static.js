const fs = require('fs-extra');
const path = require('path');
const program = require('commander');
const shelljs = require('shelljs');
const chalk = require('chalk');
const build = require('./build');

const cwd = process.cwd();

module.exports = function() {
  const utilsDir = `${cwd}/app/utils`;

  const tplPath = path.join(__dirname, './tpl.js');
  const tpl = fs.readFileSync(tplPath, 'utf-8');

  const clean = function() {
    fs.copySync(`${utilsDir}/request-temp.js`, `${utilsDir}/request.js`);
    fs.removeSync(`${utilsDir}/request-temp.js`);
    fs.removeSync(`${cwd}/app/mockers`);
  };

  process.on('exit', () => {
    try {
      clean();
    } catch (e) {}
  });

  process.on('SIGINT', () => {
    try {
      clean();
    } catch (e) {}

    if (program.runningCommand) {
      program.runningCommand.kill('SIGKILL');
    }
    process.exit(0);
  });

  try {
    // 1. move ./mock to ./src/mock
    fs.copySync(`${cwd}/mockers`, `${cwd}/app/mockers`);

    // 2. save old request.js
    fs.copySync(`${utilsDir}/request.js`, `${utilsDir}/request-temp.js`);

    // 3. modifier ./app/utils/request.js
    fs.writeFileSync(`${utilsDir}/request.js`, tpl, 'utf8');

    // 4. check CNAME
    const hasCNAME = fs.existsSync(`${cwd}/CNAME`);
    const shellStr = hasCNAME
      ? 'npm run build && cp CNAME build'
      : 'npm run build';

    // 5. npm run build
    console.log(chalk.green('building...'));
    shelljs.exec(shellStr);
  } catch (e) {
    throw new Error(e);
  }
};
