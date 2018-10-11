import { configure } from 'teasim-samples';
import './index.less';

function loadSamples() {
  require('./import.js');
}

configure(loadSamples, module);
