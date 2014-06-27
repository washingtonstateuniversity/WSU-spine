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
				NODE_ENV : 'DEVELOPMENT',

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
 				// Files to compile
  				{ src: 'styles/sass/skeleton.scss', dest: 'styles/skeleton.css' },
  				{ src: 'styles/sass/colors.scss', dest: 'styles/colors.css' },
  				{ src: 'styles/sass/respond.scss', dest: 'styles/respond.css' },
  				{ src: 'styles/sass/spine.scss', dest: 'styles/spine.css' },
  				{ src: 'styles/sass/opensans.scss', dest: 'styles/opensans.css' }
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
					location : '',
					build_version : '<%= pkg.build_version %>',
					markup: 'skip',
					markup_min: 'skip',
					malformed : 'skip', // true or false is what is tested for
					demo: 'skip',
					opensans: 'skip',
					columns: 'skip',
					spacing: 'skip',
					mainheader: 'skip',
					filledSearchTab : 'skip',
					showLong : 'skip',
					manyLinks : 'skip',
					cropped : 'skip',
					doubledContact : 'skip',
					fluidGrid : 'skip',
					hybridGrid: 'skip',
					fixedGrid: 'skip',
					navdata:'skip',
				}
			},
			js : {
				src: 'build/<%= pkg.build_version %>/spine.js'
			},
			html : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'build/<%= pkg.build_version %>/tests/html.html',
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
						markup : 'true',
						location : 'http://repo.wsu.edu/spine/1'
					}
				}
			},
			markup_min : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'spine.min.html',
				options : {
					context : {
						markup_min : 'true',
						location : 'http://repo.wsu.edu/spine/1'
					}
				}
			},
			demo : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'demo.html',
				options : {
					context : {
						demo : 'true'
					}
				}
			},
			opensans : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'build/<%= pkg.build_version %>/tests/opensans.html',
				options : {
					context : {
						opensans : 'true'
					}
				}
			},
			columns : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'build/<%= pkg.build_version %>/tests/columns.html',
				options : {
					context : {
						columns : 'true'
					}
				}
			},
			spacing : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'build/<%= pkg.build_version %>/tests/spacing.html',
				options : {
					context : {
						spacing : 'true'
					}
				}
			},
			mainheader : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'build/<%= pkg.build_version %>/tests/mainheader.html',
				options : {
					context : {
						mainheader : 'true'
					}
				}
			},
			tu_search_tabs : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'build/<%= pkg.build_version %>/tests/search_tabs.html',
				options : {
					context : {
						filledSearchTab : 'true'
					}
				}
			},
			tu_contact_malformed : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'build/<%= pkg.build_version %>/tests/contact_malformed.html',
				options : {
					context : {
						malformed : 'true'
					}
				}
			},
			tu_contact_filled : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'build/<%= pkg.build_version %>/tests/contact_filled.html',
				options : {
					context : {
						malformed : 'false'
					}
				}
			},
			tu_contact_double : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'build/<%= pkg.build_version %>/tests/contact_double.html',
				options : {
					context : {
						doubledContact : 'true'
					}
				}
			},
			tu_navdata : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'build/<%= pkg.build_version %>/tests/nav-data-links.html',
				options : {
					context : {
						navdata : 'true'
					}
				}
			},
			tu_overly : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'build/<%= pkg.build_version %>/tests/overly.html',
				options : {
					context : {
						manyLinks : 'true',
						showLong : 'true'
					}
				}
			},
			tu_overly_long : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'build/<%= pkg.build_version %>/tests/overly_long.html',
				options : {
					context : {
						showLong : 'true'
					}
				}
			},
			tu_overly_linked : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'build/<%= pkg.build_version %>/tests/overly_linked.html',
				options : {
					context : {
						manyLinks : 'true'
					}
				}
			},
			tu_cropped : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'build/<%= pkg.build_version %>/tests/cropped.html',
				options : {
					context : {
						cropped : 'true'
					}
				}
			},
			tu_grid_fluid : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'build/<%= pkg.build_version %>/tests/grid_fluid.html',
				options : {
					context : {
						fluidGrid : 'true'
					}
				}
			},
			tu_grid_hybrid : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'build/<%= pkg.build_version %>/tests/grid_hybrid.html',
				options : {
					context : {
						hybridGrid : 'true'
					}
				}
			},
			tu_grid_fixed : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'build/<%= pkg.build_version %>/tests/grid_fixed.html',
				options : {
					context : {
						fixedGrid : 'true'
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
	// grunt.loadNpmTasks('grunt-sass');
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
								'sass:dev',
								'concat',
								'preprocess:js',
								'cssmin',
								'uglify',
								'copy',
								'includereplace',
								'preprocess:html',
								'preprocess:opensans',
								'preprocess:columns',
								'preprocess:spacing',
								'preprocess:mainheader',
								'preprocess:tu_search_tabs',
								'preprocess:tu_contact_malformed',
								'preprocess:tu_contact_filled',
								'preprocess:tu_contact_double',
								'preprocess:tu_overly',
								'preprocess:tu_overly_long',
								'preprocess:tu_overly_linked',
								'preprocess:tu_cropped',
								'preprocess:tu_grid_fluid',
								'preprocess:tu_grid_hybrid',
								'preprocess:tu_grid_fixed',
								'preprocess:tu_navdata',
								'preprocess:markup',
								'preprocess:markup_min',
								'preprocess:demo'
								]);	
	
	grunt.registerTask('dev', ['jshint',
								'env:dev',
								'sass:dev',
								'concat',
								'preprocess:js',
								'cssmin',
								'uglify',
								'copy',
								'includereplace',
								'preprocess:html',
								'preprocess:opensans',
								'preprocess:columns',
								'preprocess:spacing',
								'preprocess:mainheader',
								'preprocess:tu_search_tabs',
								'preprocess:tu_contact_malformed',
								'preprocess:tu_contact_filled',
								'preprocess:tu_contact_double',
								'preprocess:tu_overly',
								'preprocess:tu_overly_long',
								'preprocess:tu_overly_linked',
								'preprocess:tu_cropped',
								'preprocess:tu_grid_fluid',
								'preprocess:tu_grid_hybrid',
								'preprocess:tu_grid_fixed',
								'preprocess:tu_navdata',
								'preprocess:markup',
								'preprocess:markup_min',
								'preprocess:demo'
								]);
		
		
};