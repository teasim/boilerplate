import teasim from 'teasim-core/lib/immutable';
import models from "./models";
import pages from "./pages";

const app = teasim();

app.model(models);

app.install(pages);

app.mount('#root');