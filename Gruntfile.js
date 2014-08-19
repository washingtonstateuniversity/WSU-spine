module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		config: {
			build: 'build/<%= pkg.build_version %>'
		},

		env: { // https://github.com/jsoverson/grunt-env
			dev: {
				NODE_ENV : 'DEVELOPMENT'
			},
			prod : {
				NODE_ENV : 'PRODUCTION'
			}
		},

		concat: {
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
				dest: '<%= config.build %>/spine.js',
			},
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' +
					'/*  See https://github.com/washingtonstateuniversity/WSU-spine/ for full source.*/\n'
			},
			build: {
				src: '<%= config.build %>/spine.js',
				dest: '<%= config.build %>/spine.min.js'
			}
		},

		sass: {
			dev: {
				files: [
					{ src: 'styles/sass/spine.scss', dest: '<%= config.build %>/spine.css' },
					{ src: 'styles/sass/opensans.scss', dest: '<%= config.build %>/styles/opensans.css' }
				]
			},
		},

		cssmin: {
			combine: {
				files: {
					// Hmmm, in reverse order (see http://gruntjs.com/configuring-tasks#files-object-format)
					'<%= config.build %>/spine.min.css': ['<%= config.build %>/spine.css']
				}
			}
		},

		clean: {
			build: 'build'
		},

		copy: {
			main: {
				files: [ // This can be drastically simplified by putting this stuff in a `src` folder.
					{ expand: true, src: ['fonts/*'], dest: '<%= config.build %>/', dot: true },
					{ expand: true, src: ['html/*'], dest: '<%= config.build %>/' },
					{ expand: true, src: ['icons/*'], dest: '<%= config.build %>/', dot: true },
					{ expand: true, src: ['images/*'], dest: '<%= config.build %>/' },
					{ expand: true, src: ['marks/*'], dest: '<%= config.build %>/' },
					{ expand: true, src: ['scripts/*'], dest: '<%= config.build %>/' },
					{ expand: true, src: ['styles/jqueryui.css', 'styles/styles.css'], dest: '<%= config.build %>/' },
					{ expand: true, src: ['spine.html','spine.min.html','authors.txt','favicon.ico'], dest: '<%= config.build %>/' }
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

		includereplace: { // https://github.com/alanshaw/grunt-include-replace
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

		preprocess : { // https://github.com/jsoverson/grunt-preprocess
			options: {
				inline: true,
				context : {
					DEBUG: true,
					location : '',
					build_version : '<%= pkg.build_version %>',
					test_title: '',
					content: 'skip',
					malformed : 'skip', // true or false is what is tested for
					demo: 'skip',
					opensans: 'skip',
					columns: 'skip',
					spacing: 'skip',
					mainheader: 'skip',
					typography: 'skip',
					unbound: 'skip',
					ui: 'skip',
					filledSearchTab : 'skip',
					showLong : 'skip',
					manyLinks : 'skip',
					cropped : 'skip',
					doubledContact : 'skip',
					fluidGrid : 'skip',
					hybridGrid: 'skip',
					fixedGrid: 'skip',
					navdata:'skip',
					markup: 'skip',
					markup_min: 'skip',
				}
			},
			js : {
				src: '<%= config.build %>/spine.js'
			},
			html : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : '<%= config.build %>/tests/html.html'
			},
			markup : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'spine.html',
				options : {
					context : {
						markup : 'true',
						content: 'true',
						location : 'http://repo.wsu.edu/spine/'
					}
				}
			},
			markup_min : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'spine.min.html',
				options : {
					context : {
						markup_min : 'true',
						content: 'false',
						location : 'http://repo.wsu.edu/spine/'
					}
				}
			},
			demo : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : 'demo.html',
				options : {
					context : {
						demo : 'true',
						content: 'false',
						location : 'http://repo.wsu.edu/spine/'
					}
				}
			},
			opensans : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : '<%= config.build %>/tests/opensans.html',
				options : {
					context : {
						opensans : 'true',
						test_title: 'Testing Open Sans',
						content: 'false',
						typography: 'true',
						location : '/build'
					}
				}
			},
			columns : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : '<%= config.build %>/tests/columns.html',
				options : {
					context : {
						columns : 'true',
						test_title: 'Testing Columns',
						location : '/build'
					}
				}
			},
			spacing : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : '<%= config.build %>/tests/spacing.html',
				options : {
					context : {
						spacing : 'true',
						test_title: 'Testing Gutters and Pads',
						location : '/build'
					}
				}
			},
			mainheader : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : '<%= config.build %>/tests/mainheader.html',
				options : {
					context : {
						mainheader : 'true',
						test_title: 'Testing the Main Header',
						content: 'true',
						location : '/build'
					}
				}
			},
			typography : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : '<%= config.build %>/tests/typography.html',
				options : {
					context : {
						test_title: 'Testing Typography',
						typography: 'true',
						location : '/build'
					}
				}
			},
			unbound : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : '<%= config.build %>/tests/unbound.html',
				options : {
					context : {
						test_title: 'Testing Unbound and Rebound',
						unbound : 'true',
						content: 'false',
						location : '/build'
					}
				}
			},
			ui : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : '<%= config.build %>/tests/ui.html',
				options : {
					context : {
						ui : 'true',
						test_title: 'User Interaction Elements',
						location : '/build'
					}
				}
			},
			tu_search_tabs : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : '<%= config.build %>/tests/search_tabs.html',
				options : {
					context : {
						filledSearchTab : 'true',
						content: 'true',
						location : '/build'
					}
				}
			},
			tu_contact_malformed : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : '<%= config.build %>/tests/contact_malformed.html',
				options : {
					context : {
						malformed : 'true',
						content: 'true',
						location : '/build'
					}
				}
			},
			tu_contact_filled : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : '<%= config.build %>/tests/contact_filled.html',
				options : {
					context : {
						malformed : 'false',
						content: 'true',
						location : '/build'
					}
				}
			},
			tu_contact_double : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : '<%= config.build %>/tests/contact_double.html',
				options : {
					context : {
						doubledContact : 'true',
						content: 'true',
						location : '/build'
					}
				}
			},
			tu_navdata : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : '<%= config.build %>/tests/nav-data-links.html',
				options : {
					context : {
						navdata : 'true',
						content: 'true',
						location : '/build'
					}
				}
			},
			tu_overly : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : '<%= config.build %>/tests/overly.html',
				options : {
					context : {
						manyLinks : 'true',
						showLong : 'true',
						location : '/build'
					}
				}
			},
			tu_overly_long : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : '<%= config.build %>/tests/overly_long.html',
				options : {
					context : {
						showLong : 'true',
						location : '/build'
					}
				}
			},
			tu_overly_linked : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : '<%= config.build %>/tests/overly_linked.html',
				options : {
					context : {
						manyLinks : 'true',
						content: 'true',
						location : '/build'
					}
				}
			},
			tu_cropped : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : '<%= config.build %>/tests/cropped.html',
				options : {
					context : {
						cropped : 'true',
						test_title: 'Testing Cropped Spine',
						content: 'true',
						location : '/build'
					}
				}
			},
			grid_fluid : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : '<%= config.build %>/tests/grid_fluid.html',
				options : {
					context : {
						fluidGrid : 'true',
						test_title: 'Testing Fluid Grid',
						content: 'true',
						location : '/build'
					}
				}
			},
			grid_hybrid : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : '<%= config.build %>/tests/grid_hybrid.html',
				options : {
					context : {
						hybridGrid : 'true',
						test_title: 'Testing Hybrid Grid',
						content: 'true',
						location : '/build'
					}
				}
			},
			grid_fixed : {
				src : 'test/preprocess/test.cat.pre.html',
				dest : '<%= config.build %>/tests/grid_fixed.html',
				options : {
					context : {
						fixedGrid : 'true',
						test_title: 'Testing Fixed Grid',
						content: 'true',
						location : '/build'
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

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-include-replace');
	grunt.loadNpmTasks('grunt-preprocess');

	// Default task(s).
	grunt.registerTask('default', ['jshint']);

	grunt.registerTask('prod', [
		'env:prod',
		'build'
	]);

	grunt.registerTask('dev', [
		'jshint',
		'env:dev',
		'build'
	]);

	grunt.registerTask('build', [
		'clean',
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
		'preprocess:typography',
		'preprocess:unbound',
		'preprocess:ui',
		'preprocess:tu_search_tabs',
		'preprocess:tu_contact_malformed',
		'preprocess:tu_contact_filled',
		'preprocess:tu_contact_double',
		'preprocess:tu_overly',
		'preprocess:tu_overly_long',
		'preprocess:tu_overly_linked',
		'preprocess:tu_cropped',
		'preprocess:grid_fluid',
		'preprocess:grid_hybrid',
		'preprocess:grid_fixed',
		'preprocess:tu_navdata',
		'preprocess:markup',
		'preprocess:markup_min',
		'preprocess:demo'
	]);
};
