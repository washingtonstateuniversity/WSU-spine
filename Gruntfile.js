module.exports = function(grunt) {
	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		env : {
			options : {
				/* Shared Options Hash */
				//globalOption : 'foo'
			},
			dev: {
				NODE_ENV : 'DEVELOPMENT'
			},
			prod : {
				NODE_ENV : 'PRODUCTION'
			}
		},
		concat: {
			styles: {
				src: ['styles/skeleton.css','styles/colors.css','styles/spine.css','styles/respond.css'],
				dest: 'build/<%= pkg.build_version %>/spine.css',
			},
			scripts: {
				src: [
					'scripts/debug.js',
					'scripts/wsu_autocomplete.js',
					'scripts/ui.spine.js',
					'scripts/ui.spine.framework.js',
					'scripts/ui.spine.search.js',
					'scripts/ui.spine.social.js',
					'scripts/ui.spine.analytics.js',
					'scripts/spine.js'
				],
				dest: 'build/<%= pkg.build_version %>/spine.js',
			},
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' +
					'/*  See https://github.com/washingtonstateuniversity/WSU-spine/ for full source.*/\n'
			},
			build: {
				src: 'build/<%= pkg.build_version %>/spine.js',
				dest: 'build/<%= pkg.build_version %>/spine.min.js'
			}
		},
		cssmin: {
			combine: {
				files: {
					// Hmmm, in reverse order
					'build/<%= pkg.build_version %>/spine.min.css': ['build/<%= pkg.build_version %>/spine.css']
				}
			}
		},
		copy: {
			main: {
				files: [
					{expand: true, dot:true, src: ['fonts/*'], dest: 'build/<%= pkg.build_version %>/'},
					{expand: true, src: ['html/*'], dest: 'build/<%= pkg.build_version %>/'},
					{expand: true, dot:true, src: ['icons/*'], dest: 'build/<%= pkg.build_version %>/'},
					{expand: true, src: ['images/*'], dest: 'build/<%= pkg.build_version %>/'},
					{expand: true, src: ['marks/*'], dest: 'build/<%= pkg.build_version %>/'},
					{expand: true, src: ['scripts/*'], dest: 'build/<%= pkg.build_version %>/'},
					{expand: true, src: ['styles/*'], dest: 'build/<%= pkg.build_version %>/'},
					{expand: true, src: ['spine.html','spine.min.html','authors.txt','favicon.ico'], dest: 'build/<%= pkg.build_version %>/'},
				]
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'scripts/*.js'],
			options: {
				// options here to override JSHint defaults
				boss: true,
				curly: true,
				eqeqeq: true,
				eqnull: true,
				expr: true,
				immed: true,
				noarg: true,
				onevar: true,
				quotmark: "double",
				smarttabs: true,
				trailing: true,
				undef: true,
				unused: true,
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true,
					window:true
				}
			}
		},
		preprocess : {
			options: {
				inline: true,
				context : {
					DEBUG: true,
					build_version : '<%= pkg.build_version %>',
					MALFORMED : 'skip', // true or false is what is tested for
					filledSearchTab : 'skip', // true or false is what is tested for
				}
			},
			js : {
				src: 'build/<%= pkg.build_version %>/spine.js'
			},
			html : {
				src : 'test/preprocess/test.pre.html',
				dest : 'test/default.html',
				options : {
					context : {
					}
				}
			},
			tu_filledSearchTabs : {
				src : 'test/preprocess/test.pre.html',
				dest : 'test/filledSearchTabs.html',
				options : {
					context : {
						filledSearchTab : 'true'
					}
				}
			},
			tu_malformedContact : {
				src : 'test/preprocess/test.pre.html',
				dest : 'test/malformedContact.html',
				options : {
					context : {
						MALFORMED : 'true'
					}
				}
			},
			tu_filledContact : {
				src : 'test/preprocess/test.pre.html',
				dest : 'test/filledContact.html',
				options : {
					context : {
						MALFORMED : 'false'
					}
				}
			},
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-preprocess');

	// Default task(s).
	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('prod', ['jshint','env:prod', 'concat','preprocess:js','cssmin','uglify','copy','preprocess:html']);	
	
	grunt.registerTask('dev', ['jshint',
								'env:dev',
								'concat',
								'preprocess:js',
								'cssmin',
								'uglify',
								'copy',
								'preprocess:html',
								'preprocess:tu_filledSearchTabs',
								'preprocess:tu_malformedContact',
								'preprocess:tu_filledContact'
								]);
		
		
};