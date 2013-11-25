module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' +
					'/*  See https://github.com/washingtonstateuniversity/WSU-spine/ for full source.*/\n'
			},
			build: {
				src: 'scripts/<%= pkg.file %>.js',
				dest: 'build/<%= pkg.name %>.min.js'
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'scripts/*.js'],
			options: {
				// options here to override JSHint defaults
				smarttabs: true,
				expr:      true,
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Default task(s).
	grunt.registerTask('default', ['uglify','jshint']);

};