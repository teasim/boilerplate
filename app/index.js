import teasim from 'teasim';
import createLoading from "teasim-plugin-loading";
import './index.less';

/* 1. Initialize */
const app = teasim({
  immutable: true
});

/* 2. Plugins */
app.use(createLoading());

/* 3. Models */
app.model(require("models").default);

/* 4. Install */
app.install(require("pages").default);

/* 5. Mount */
app.mount('#root');