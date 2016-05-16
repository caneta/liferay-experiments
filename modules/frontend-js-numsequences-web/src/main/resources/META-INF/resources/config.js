Loader.define("com.liferay.frontend.js.polyfill.babel.web@1.0.1/browser-polyfill.min", ['exports'],
  function (exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
  },
  {
    dependencies: [],
    exports: '_babelPolyfill',
    name: 'polyfill-babel',
    path: '/o/frontend-js-polyfill-babel-web/browser-polyfill.min.js'
  }
);

Loader.require('com.liferay.frontend.js.polyfill.babel.web@1.0.1/browser-polyfill.min');

__CONFIG__.modules['com.liferay.frontend.js.polyfill.babel.web@1.0.1/browser-polyfill.min'] = Loader._getConfigParser()._modules['com.liferay.frontend.js.polyfill.babel.web@1.0.1/browser-polyfill.min'];

__CONFIG__.maps['polyfill-babel']='com.liferay.frontend.js.polyfill.babel.web@1.0.1/browser-polyfill.min';

// Loader.addModule(
//   {
//     dependencies: [],
//     exports: 'Sequence',
//     name: 'sequence',
//     path: MODULE_PATH + '/sequences/sequence.es.js'
//   }
// );

// Loader.addModule(
//   {
//     // dependencies: ['sequence'],
//     dependencies: [],
//     exports: 'FibonacciSequence',
//     name: 'fibonacci',
//     path: MODULE_PATH + '/sequences/fibonacci.es.js'
//   }
// );

// Loader.addModule(
//   {
//     // dependencies: ['fibonacci'],
//     dependencies: [],
//     exports: 'fibonacci',
//     name: 'js-numsequences',
//     path: MODULE_PATH + 'collection.es.js'
//   }
// );
