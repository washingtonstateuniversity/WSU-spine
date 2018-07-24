var sass = require( "node-sass" );

module.exports = {
	dev: {
		options: {
			implementation: sass,
			sourceMap: true,
			outputStyle: "expanded"
		},
		files: [
			{ src: "styles/sass/spine.scss", dest: "tmp/css/spine.css" }
		]
	}
};
