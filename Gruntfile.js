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
		sass: {
			dev: {
				files: [
				// Files to perform replacements and includes with
				{ src: 'styles/sass/skeleton.scss', dest: 'styles/skeleton.css' },
				{ src: 'styles/sass/colors.scss', dest: 'styles/colors.css' },
				{ src: 'styles/sass/respond.scss', dest: 'styles/respond.css' },
				{ src: 'styles/sass/spine.scss', dest: 'styles/spine.css' }
				]
			},
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
		includereplace: {
			dist: {
				options: {
					globals: {
						var1: 'one',
						var2: 'two',
						var3: 'three'
					},
				},
				src: 'test/preprocess/test.pre.html',
				dest: 'test/preprocess/test.cat.pre.html'
			}
		},
		preprocess : {
			options: {
				inline: true,
				context : {
					DEBUG: true,
					build_version : '<%= pkg.build_version %>',
					markup: 'skip',
					MALFORMED : 'skip', // true or false is what is tested for
					filledSearchTab : 'skip',
					showLong : 'skip',
					manyLinks : 'skip',
					cropped : 'skip',
					doubledContact : 'skip',
					fluidGrid : 'skip',
					hybridGrid: 'skip',
					fixedGrid: 'skip',
					layouts: 'skip',
				}
			},
			js : {
				src: 'build/<%= pkg.build_version %>/spine.js'
			},
			html : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'test/tests/html.html',
				options : {
					context : {
					}
				}
			},
			markup : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'spine.html',
				options : {
					context : {
						markup : 'true'
					}
				}
			},
			tu_filledSearchTabs : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'test/tests/filledSearchTabs.html',
				options : {
					context : {
						filledSearchTab : 'true'
					}
				}
			},
			tu_malformedContact : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'test/tests/malformedContact.html',
				options : {
					context : {
						MALFORMED : 'true'
					}
				}
			},
			tu_filledContact : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'test/tests/filledContact.html',
				options : {
					context : {
						MALFORMED : 'false'
					}
				}
			},
			tu_overlyLong : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'test/tests/overlyLong.html',
				options : {
					context : {
						showLong : 'true'
					}
				}
			},
			tu_overlyLinked : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'test/tests/overlyLinked.html',
				options : {
					context : {
						manyLinks : 'true'
					}
				}
			},
			tu_overlyLinked_n_overlyLong : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'test/tests/overlyLinked_n_overlyLong.html',
				options : {
					context : {
						manyLinks : 'true',
						showLong : 'true'
					}
				}
			},
			tu_cropped : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'test/tests/cropped.html',
				options : {
					context : {
						cropped : 'true'
					}
				}
			},
			tu_doubledContact : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'test/tests/doubledContact.html',
				options : {
					context : {
						doubledContact : 'true'
					}
				}
			},
			tu_fluidGrid : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'test/tests/fluidGrid.html',
				options : {
					context : {
						fluidGrid : 'true'
					}
				}
			},
			tu_hybridGrid : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'test/tests/hybridGrid.html',
				options : {
					context : {
						hybridGrid : 'true'
					}
				}
			},
			tu_fixedGrid : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'test/tests/fixedGrid.html',
				options : {
					context : {
						fixedGrid : 'true'
					}
				}
			},
			tu_layouts : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'test/tests/layouts.html',
				options : {
					context : {
						layouts : 'true'
					}
				}
			},
		},
		watch: {
	      html: {
	        files: ['test/*.html'],
	        tasks: ['dev'],
	        options: {
	          livereload: true,
	        }
	      },
	    }
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-include-replace');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-preprocess');
	

	// Default task(s).
	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('prod', ['env:prod',
								'concat',
								'preprocess:js',
								'cssmin',
								'uglify',
								'copy',
								'includereplace',
								'preprocess:html',
								'preprocess:markup'
								]);	
	
	grunt.registerTask('dev', ['jshint',
								'env:dev',
								'concat',
								'preprocess:js',
								'sass:dev',
								'cssmin',
								'uglify',
								'copy',
								'includereplace',
								'preprocess:html',
								'preprocess:tu_filledSearchTabs',
								'preprocess:tu_malformedContact',
								'preprocess:tu_filledContact',
								'preprocess:tu_overlyLong',
								'preprocess:tu_overlyLinked',
								'preprocess:tu_overlyLinked_n_overlyLong',
								'preprocess:tu_cropped',
								'preprocess:tu_doubledContact',
								'preprocess:tu_fluidGrid',
								'preprocess:tu_hybridGrid',
								'preprocess:tu_fixedGrid',
								'preprocess:tu_layouts'
								]);
		
		
};