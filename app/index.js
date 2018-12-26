import teasim from 'teasim/lib/immutable';
import { createLoading } from 'teasim-plugins';
import './index.less';

/* 1. Initialize */
const app = teasim();

/* 2. Plugins */
app.use(createLoading());

/* 3. Models */
app.model(require('models/digit').default);
app.model(require('models/user').default);

/* 4. Install */
app.install(require('pages').default);

/* 5. Mount */
app.mount('#root');

/* 6. ServiceWorker */
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
