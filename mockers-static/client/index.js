import teasim from 'teasim';

const app = teasim();
app.install(require("pages").default);
app.mount('#root');