import { configure } from 'teasim-samples';
import './index.less';

function loadSamples () {
  require('./demo.js')
}

configure(loadSamples, module)
