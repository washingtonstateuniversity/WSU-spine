module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			styles: {
		      src: ['styles/skeleton.css','styles/colors.css','styles/spine.css','styles/respond.css'],
		      dest: 'spine.css',
		    },
		    scripts: {
		      src: [ 'scripts/spine.js'],
			  dest: 'spine.js',
			  },
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' +
					'/*  See https://github.com/washingtonstateuniversity/WSU-spine/ for full source.*/\n'
			},
			build: {
				src: 'spine.js',
				dest: 'spine.min.js'
			}
		},
		cssmin: {
		  combine: {
		    files: {
		      'spine.min.css': ['spine.css']
		    }
		  }
		},
		copy: {
		  main: {
		    files: [
		      {expand: true, src: ['fonts/*'], dest: '1.0/'},
		      {expand: true, src: ['html/*'], dest: '1.0/'},
		      {expand: true, src: ['icons/*'], dest: '1.0/'},
		      {expand: true, src: ['images/*'], dest: '1.0/'},
		      {expand: true, src: ['marks/*'], dest: '1.0/'},
		      {expand: true, src: ['scripts/*'], dest: '1.0/'},
		      {expand: true, src: ['styles/*'], dest: '1.0/'},
		      {expand: true, src: ['spine.html','spine.css','spine.js','authors.txt'], dest: '1.0/'},
		    ]
		  }
		},
		jshint: {
			files: ['Gruntfile.js', 'scripts/*.js'],
			options: {
				// options here to override JSHint defaults
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
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Default task(s).
	grunt.registerTask('default', ['concat','cssmin','uglify','copy']);

};