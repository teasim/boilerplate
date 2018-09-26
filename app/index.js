import teasim from 'teasim-core/immutable';
import models from "./models";
import pages from "./pages";

const app = teasim();

app.model(models);

app.install(pages);

app.mount('#root');