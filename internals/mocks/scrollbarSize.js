jest.mock('dom-helpers/util/scrollbarSize', () => {
  return function getScrollbarSize () {
    return 20;
  };
});

global.requestAnimationFrame = require('raf');
