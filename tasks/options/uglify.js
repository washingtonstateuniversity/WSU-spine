module.exports = {
	options: {
		banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' +
			'/*  See https://github.com/washingtonstateuniversity/WSU-spine/ for full source.*/\n'
	},
	build: {
		src: '<%= config.build %>/spine.js',
		dest: '<%= config.build %>/spine.min.js'
	}
}