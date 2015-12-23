/* global require */
module.exports = {
	options: {
		map: true,
		diff: false,
		processors: [
			require( "autoprefixer" )( {
				browsers: [ "> 1%", "ie 8-11", "Firefox ESR" ]
			} )
		]
	},
	dist: {
		src: "tmp/css/spine.css",
		dest: "<%= config.build %>/spine.css"
	}
};