module.exports = {
	options: {
		inline: true,
		context : {
			DEBUG: true,
			basepath:'<%= setbase %>',
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
			markup_min: 'skip'
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
			}
		}
	},
	markup_min : {
		src : 'test/preprocess/test.cat.pre.html',
		dest : 'spine.min.html',
		options : {
			context : {
				markup_min : 'true',
				content: 'false'
			}
		}
	},
	demo : {
		src : 'test/preprocess/test.cat.pre.html',
		dest : '<%= config.build %>/demo.html',
		options : {
			context : {
				demo : 'true',
				content: 'false'
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
				typography: 'true'
			}
		}
	},
	columns : {
		src : 'test/preprocess/test.cat.pre.html',
		dest : '<%= config.build %>/tests/columns.html',
		options : {
			context : {
				columns : 'true',
				test_title: 'Testing Columns'
			}
		}
	},
	spacing : {
		src : 'test/preprocess/test.cat.pre.html',
		dest : '<%= config.build %>/tests/spacing.html',
		options : {
			context : {
				spacing : 'true',
				test_title: 'Testing Gutters and Pads'
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
				content: 'true'
			}
		}
	},
	typography : {
		src : 'test/preprocess/test.cat.pre.html',
		dest : '<%= config.build %>/tests/typography.html',
		options : {
			context : {
				test_title: 'Testing Typography',
				typography: 'true'
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
				content: 'false'
			}
		}
	},
	ui : {
		src : 'test/preprocess/test.cat.pre.html',
		dest : '<%= config.build %>/tests/ui.html',
		options : {
			context : {
				ui : 'true',
				test_title: 'User Interaction Elements'
			}
		}
	},
	tu_search_tabs : {
		src : 'test/preprocess/test.cat.pre.html',
		dest : '<%= config.build %>/tests/search_tabs.html',
		options : {
			context : {
				filledSearchTab : 'true',
				content: 'true'
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
				location : 'https://repo.wsu.edu/spine'
			}
		}
	},
	tu_contact_filled : {
		src : 'test/preprocess/test.cat.pre.html',
		dest : '<%= config.build %>/tests/contact_filled.html',
		options : {
			context : {
				malformed : 'false',
				content: 'true'
			}
		}
	},
	tu_contact_double : {
		src : 'test/preprocess/test.cat.pre.html',
		dest : '<%= config.build %>/tests/contact_double.html',
		options : {
			context : {
				doubledContact : 'true',
				content: 'true'
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
				location : 'https://repo.wsu.edu/spine'
			}
		}
	},
	tu_overly : {
		src : 'test/preprocess/test.cat.pre.html',
		dest : '<%= config.build %>/tests/overly.html',
		options : {
			context : {
				manyLinks : 'true',
				showLong : 'true'
			}
		}
	},
	tu_overly_long : {
		src : 'test/preprocess/test.cat.pre.html',
		dest : '<%= config.build %>/tests/overly_long.html',
		options : {
			context : {
				showLong : 'true'
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
				location : 'https://repo.wsu.edu/spine'
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
				content: 'true'
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
				content: 'true'
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
				content: 'true'
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
				content: 'true'
			}
		}
	}
}