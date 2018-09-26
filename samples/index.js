import { configure } from 'teasim-samples';
import './index.less';

function loadSamples () {
  require('./Button.js')
}

configure(loadSamples, module)
