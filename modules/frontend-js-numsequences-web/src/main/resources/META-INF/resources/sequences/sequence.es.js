'use strict';


// import _babelPolyfill from 'polyfill-babel';
// import _babelPolyfill from 'com.liferay.frontend.js.polyfill.babel.web';
import polyfillBabel from 'polyfill-babel';

class Sequence {
	constructor(generatorFn, label) {
		this.generator = new generatorFn();
		this.label = label;
	}

	next() {
		return this.generator.next();
	}
}

export default Sequence;

(function META() {
  return {
    condition: {
      test: function() {
        return true;
      },
      trigger: 'polyfill-babel'
    },
    path: './sequence.es.js'
  };
});

