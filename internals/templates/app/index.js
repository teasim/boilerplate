import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { ConnectedRouter } from 'react-router-redux'
import { ApplicationProvider } from 'teasim'
import { Application, LocaleProvider } from 'app/entrances/index'
import { translationMessages } from 'app/helpers/internationalization'
import generateStore from 'app/stores/index'
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!app/resources/icons/favicon.ico'
import '!file-loader?name=[name].[ext]!app/resources/icons/icon-72x72.png'
import '!file-loader?name=[name].[ext]!app/resources/icons/icon-96x96.png'
import '!file-loader?name=[name].[ext]!app/resources/icons/icon-120x120.png'
import '!file-loader?name=[name].[ext]!app/resources/icons/icon-128x128.png'
import '!file-loader?name=[name].[ext]!app/resources/icons/icon-144x144.png'
import '!file-loader?name=[name].[ext]!app/resources/icons/icon-152x152.png'
import '!file-loader?name=[name].[ext]!app/resources/icons/icon-167x167.png'
import '!file-loader?name=[name].[ext]!app/resources/icons/icon-180x180.png'
import '!file-loader?name=[name].[ext]!app/resources/icons/icon-192x192.png'
import '!file-loader?name=[name].[ext]!app/resources/icons/icon-384x384.png'
import '!file-loader?name=[name].[ext]!app/resources/icons/icon-512x512.png'
import '!file-loader?name=[name].[ext]!app/resources/icons/manifest.json'
import 'file-loader?name=[name].[ext]!.htaccess' // eslint-disable-line import/extensions
/* eslint-enable import/no-webpack-loader-syntax */
import 'app/styles/development.less'

const mountNode = document.getElementById('application')
const browserHistory = createHistory()
const { store, history } = generateStore(browserHistory, window.__INITIAL_STATE__); // eslint-disable-line 

/* development instance */
const renderDevelopmentApplication = messages => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <LocaleProvider messages={messages}>
          <ConnectedRouter history={history}>
            <ApplicationProvider type='webapp'>
              <Application />
            </ApplicationProvider>
          </ConnectedRouter>
        </LocaleProvider>
      </Provider>
    </AppContainer>
  , mountNode)
}

if (module.hot) {
  module.hot.accept('app/helpers/internationalization', () => {
    renderDevelopmentApplication(translationMessages)
  })
};

/* production instance */
const renderProductionApplication = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <LocaleProvider messages={messages}>
        <ConnectedRouter history={history}>
          <ApplicationProvider type='webapp'>
            <Application />
          </ApplicationProvider>
        </ConnectedRouter>
      </LocaleProvider>
    </Provider>
  , mountNode)
}

if (!window.Intl) {
  (new Promise((resolve) => {
    resolve(import('intl'))
  }))
    .then(() => Promise.all([
      import('intl/locale-data/jsonp/en.js'),
      import('intl/locale-data/jsonp/zh.js')
    ]))
    .then(() => renderProductionApplication(translationMessages))
    .catch((err) => {
      throw err
    })
} else {
  renderProductionApplication(translationMessages)
}

/* Install ServiceWorker and AppCache in the end since */
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install() // eslint-disable-line global-require
};
