const fs = require('fs-extra');
const path = require('path');
const program = require('commander');
const shelljs = require('shelljs');
const chalk = require('chalk');
const build = require('./build');

const cwd = process.cwd();
const configPath = `${cwd}/.mockers.docs.js`;
const config = fs.existsSync(configPath) ? require(configPath) : {};

module.exports = function() {
  const utilsDir = config.requestPath
    ? path.join(cwd, config.requestPath)
    : `${cwd}/app/utils`;

  const gaTpl = function(code) {
    return `<script>
  // Enable Google Analytics
  if (!location.port) {
    /* eslint-disable */
    (function (i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r;
      i[r] = i[r] || function () {
          (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
      a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
    ga('create', '${code}', 'auto');
    ga('send', 'pageview');
    /* eslint-enable */
  }
  </script>
  `;
  };

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
    shelljs.exec(shellStr, (code, stdout, stderr) => {
      build('', () => {
        clean();
      });
    });
  } catch (e) {
    throw new Error(e);
  }
};
