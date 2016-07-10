const _ = require('lodash');

transform.reconstruct = reconstruct;

module.exports = transform;

function transformTreeIter(path, obj, predicate, mapping) {
	return predicate(obj) ?
		[mapping(obj, path)] :
		_(obj)
			.toPairs()
			.map(([key, val]) =>
				transformTreeIter([...path, key], val, predicate, mapping))
			.flatten()
			.reject(_.isNull)
			.value();
}

function transform(obj, predicate, mapping, storePath) {
	const map = storePath ?
		(obj, path) => ({ path: [...path], value: mapping(obj, path) }) :
		mapping;
	return _.flatten(transformTreeIter([], obj, predicate, map));
}

function reconstruct(flattened) {
	return flattened.reduce((obj, { path, value }) => {
		const [site, name] = path.reduce(
			([site, name], next) =>
				name === null ? [site, next] :
				_.has(site, name) ? [site[name], next] :
				[site[name] = {}, next],
			[obj, null]);
		if (name === null) {
			throw new Error('No path');
		}
		site[name] = value;
		return obj;
	}, {});
}
