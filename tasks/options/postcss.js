/* global require */
module.exports = {
	options: {
		map: true,
		diff: true,
		processors: [
			require( "autoprefixer" )( {
				browsers: [ "last 2 versions", "ie 8-11" ]
			} )
		]
	},
	dist: {
		src: "tmp/css/spine.css"
	}
};