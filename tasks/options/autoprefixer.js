module.exports = {
	options: {
		browsers: ["> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1", "ie 8", "ie 9","ie 10"]
	},
	front_styles: {
		src: "tmp/css/spine.css",
		dest: "<%= config.build %>/spine.css"
	}
};