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
					MALFORMED : 'skip', // true or false is what is tested for
					filledSearchTab : 'skip',
					showLong : 'skip',
					manyLinks : 'skip',
					cropped : 'skip',
					doubledContact : 'skip',
					fluidGrid : 'skip',
					hybridGrid: 'skip',
				}
			},
			js : {
				src: 'build/<%= pkg.build_version %>/spine.js'
			},
			html : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'test/default.html',
				options : {
					context : {
					}
				}
			},
			tu_filledSearchTabs : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'test/filledSearchTabs.html',
				options : {
					context : {
						filledSearchTab : 'true'
					}
				}
			},
			tu_malformedContact : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'test/malformedContact.html',
				options : {
					context : {
						MALFORMED : 'true'
					}
				}
			},
			tu_filledContact : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'test/filledContact.html',
				options : {
					context : {
						MALFORMED : 'false'
					}
				}
			},
			tu_overlyLong : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'test/overlyLong.html',
				options : {
					context : {
						showLong : 'true'
					}
				}
			},
			tu_overlyLinked : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'test/overlyLinked.html',
				options : {
					context : {
						manyLinks : 'true'
					}
				}
			},
			tu_overlyLinked_n_overlyLong : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'test/overlyLinked_n_overlyLong.html',
				options : {
					context : {
						manyLinks : 'true',
						showLong : 'true'
					}
				}
			},			
			tu_cropped : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'test/cropped.html',
				options : {
					context : {
						cropped : 'true'
					}
				}
			},		
			tu_doubledContact : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'test/doubledContact.html',
				options : {
					context : {
						doubledContact : 'true'
					}
				}
			},			
			tu_fluidGrid : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'test/fluidGrid.html',
				options : {
					context : {
						fluidGrid : 'true'
					}
				}
			},		
			tu_hybridGrid : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'test/hybridGrid.html',
				options : {
					context : {
						hybridGrid : 'true'
					}
				}
			},				
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-include-replace');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-preprocess');

	// Default task(s).
	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('prod', ['env:prod', 'concat','preprocess:js','cssmin','uglify','copy','includereplace','preprocess:html']);	
	
	grunt.registerTask('dev', ['jshint',
								'env:dev',
								'concat',
								'preprocess:js',
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
								]);
		
		
};