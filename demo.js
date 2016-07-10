const _ = require('lodash');

const test = {
	i: {
		am: {
			a: 'potato cod',
			called: 'shahneela',
		},
		and: {
			i: {
				am: 'angry'
			}
		}
	}
};

const x = require('./index');

console.dir(test, { depth: null });

console.dir(x(test, _.isString, _.toUpper, false));

console.dir(x(test, _.isString, _.toUpper, true));

console.dir(x.reconstruct(x(test, _.isString, _.toUpper, true)), {depth: null});
