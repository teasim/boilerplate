/**
 * Language Generator
 */
const fs = require('fs-extra');
const exec = require('child_process').exec;

function languageIsSupported(language) {
  try {
    fs.accessSync(`app/languages/${language}.json`, fs.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  description: 'Add a language',
  prompts: [{
    type: 'input',
    name: 'language',
    message: 'What is the language you want to add internationalization support for (e.g. "fr", "de")?',
    default: 'fr',
    validate: (value) => {
      if ((/.+/).test(value) && value.length === 2) {
        return languageIsSupported(value) ? `The language "${value}" is already supported.` : true;
      }

      return '2 character language specifier is required';
    },
  }],

  actions: () => {
    const actions = [];
    actions.push({
      type: 'modify',
      path: '../../app/helpers/internationalization.js',
      pattern: /('react-intl\/locale-data\/[a-z]+';\n)(?!.*'react-intl\/locale-data\/[a-z]+';)/g,
      templateFile: './language/intl-locale-data.hbs',
    });
    actions.push({
      type: 'modify',
      path: '../../app/helpers/internationalization.js',
      pattern: /(\s+'[a-z]+',\n)(?!.*\s+'[a-z]+',)/g,
      templateFile: './language/app-locale.hbs',
    });
    actions.push({
      type: 'modify',
      path: '../../app/helpers/internationalization.js',
      pattern: /(from\s'..\/languages\/[a-z]+.json';\n)(?!.*from\s'..\/languages\/[a-z]+.json';)/g,
      templateFile: './language/translation-messages.hbs',
    });
    actions.push({
      type: 'modify',
      path: '../../app/helpers/internationalization.js',
      pattern: /(addLocaleData\([a-z]+LocaleData\);\n)(?!.*addLocaleData\([a-z]+LocaleData\);)/g,
      templateFile: './language/add-locale-data.hbs',
    });
    actions.push({
      type: 'modify',
      path: '../../app/helpers/internationalization.js',
      pattern: /([a-z]+:\sformatTranslationMessages\('[a-z]+',\s[a-z]+TranslationMessages\),\n)(?!.*[a-z]+:\sformatTranslationMessages\('[a-z]+',\s[a-z]+TranslationMessages\),)/g,
      templateFile: './language/format-translation-messages.hbs',
    });
    actions.push({
      type: 'add',
      path: '../../app/languages/{{language}}.json',
      templateFile: './language/translations-json.hbs',
      abortOnFail: true,
    });
    actions.push({
      type: 'modify',
      path: '../../app/index.js',
      pattern: /(import\('intl\/locale-data\/jsonp\/[a-z]+\.js'\),\n)(?!.*import\('intl\/locale-data\/jsonp\/[a-z]+\.js'\),)/g,
      templateFile: './language/polyfill-intl-locale.hbs',
    });
    actions.push(
      () => {
        const cmd = 'npm run extract-intl';
        exec(cmd, (err, result, stderr) => {
          if (err || stderr) {
            throw err || stderr;
          }
          process.stdout.write(result);
        });
        return 'modify translation messages';
      }
    );

    return actions;
  },
};
