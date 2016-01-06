module.exports = {
	get_site_obj: function () {
		var site_obj = {
			globals:{
				google_analytics: ""
			},
			page_defaults: {
				file_root: "build/tests/",
				nav_root: "tests/",
				template: "main"
			},
			pages: {
				index: {
					name: "index",
					title: "WSU Spine HTML",
					nav: {
						nav_link: "index.html"
					},
					vars: {
						typography: true
					}
				},

				demo: {
					title: "Basic Demo",
					nav: {
						nav_link: "demo.html",
						nav_title: "Demo"
					},
					vars: {
						demo: true
					}
				},

				_behaviors: {
					file: false,
					nav: {
						nav_link: "#",
						nav_title: "Responsive Grids"
					}
				},

				grid_fluid: {
					title: "Testing Fluid Grid",
					nav: {
						parent: "Responsive Grids",
						nav_link: "grid_fluid.html",
						nav_title: "Fluid Grid"
					},
					vars: {
						grid_layout: "fluid",
						content: true
					}
				},

				grid_hybrid: {
					title: "Testing Hybrid Grid",
					nav: {
						parent: "Responsive Grids",
						nav_link: "grid_hybrid.html",
						nav_title: "Hybrid Grid"
					},
					vars: {
						grid_layout: "hybrid",
						content: true
					}
				},

				grid_fixed: {
					title: "Testing Fixed Grid",
					nav: {
						parent: "Responsive Grids",
						nav_link: "grid_fixed.html",
						nav_title: "Fixed Grid"
					},
					vars: {
						grid_layout: "fixed",
						content: true
					}
				},

				_layouts: {
					file: false,
					nav: {
						nav_link: "#",
						nav_title: "Layouts and Columns"
					}
				},

				columns: {
					title: "Testing Columns",
					nav: {
						parent: "Layouts and Columns",
						nav_link: "columns.html",
						nav_title: "Columns"
					},
					vars: {
						columns: true
					}
				},

				spacing: {
					title: "Testing Gutters and Pads",
					nav: {
						parent: "Layouts and Columns",
						nav_link: "spacing.html",
						nav_title: "Gutters and Pads"
					},
					vars: {
						spacing: true
					}
				},

				mainheader: {
					title: "Testing the Main Header",
					nav: {
						parent: "Layouts and Columns",
						nav_link: "mainheader.html",
						nav_title: "Main Header"
					},
					vars: {
						mainheader: true,
						content: true
					}
				},

				unbound: {
					title: "Testing Unbound and Rebound",
					nav: {
						parent: "Layouts and Columns",
						nav_link: "unbound.html",
						nav_title: "Unbound and Rebound"
					},
					vars: {
						unbound: true
					}
				},

				cropped: {
					title: "Cropped Spine",
					nav: {
						parent: "Layouts and Columns",
						nav_link: "cropped.html",
						nav_title: "Cropped Spine"
					},
					vars: {
						cropped: true,
						content: true
					}
				},

				_content: {
					file: false,
					nav: {
						nav_link: "#",
						nav_title: "Content"
					}
				},

				ui: {
					title: "User Interaction Elements",
					nav: {
						parent: "Content",
						nav_link: "ui.html",
						nav_title: "User Interfaces"
					},
					vars: {
						ui: true
					}
				},

				_broken : {
					file: false,
					nav: {
						nav_link: "#",
						nav_title: "Broken"
					}
				},

				contact_malformed: {
					nav: {
						parent: "Broken",
						nav_link: "contact_malformed.html",
						nav_title: "malformed Contact"
					},
					vars: {
						malformed: true,
						content: true,
						location: "https://repo.wsu.edu/spine"
					}
				},

				contact_filled: {
					nav: {
						parent: "Broken",
						nav_link: "contact_filled.html",
						nav_title: "Prefilled Contact"
					},
					vars: {
						malformed: "false",
						content: true
					}
				},

				contact_double: {
					nav: {
						parent: "Broken",
						nav_link: "contact_double.html",
						nav_title: "Contact doubling"
					},
					vars: {
						doubledContact: true,
						content: true
					}
				},

				search_tabs: {
					title: "Testing search tab",
					nav: {
						parent: "Broken",
						nav_link: "search_tabs.html",
						nav_title: "Local Defined Search"
					},
					vars: {
						filledSearchTab: true,
						content: true
					}
				},

				_testing: {
					file: false,
					nav: {
						nav_link: "#",
						nav_title: "Testing Units"
					}
				},

				overly: {
					nav: {
						parent: "Testing Units",
						nav_link: "overly.html",
						nav_title: "Overly Overly"
					},
					vars: {
						manyLinks: true,
						showLong: true
					}
				},

				overly_linked: {
					nav: {
						parent: "Testing Units",
						nav_link: "overly_linked.html",
						nav_title: "Overly Linked"
					},
					vars: {
						manyLinks: true,
						content: true,
						location: "https://repo.wsu.edu/spine"
					}
				},

				overly_long: {
					nav: {
						parent: "Testing Units",
						nav_link: "overly_long.html",
						nav_title: "Overly Long"
					},
					vars: {
						showLong: true
					}
				},

				anchored: {
					nav: {
						parent: "Testing Units",
						nav_link: "anchored.html",
						nav_title: "Anchored page"
					},
					vars: {
						anchored: true
					}
				}
			}
		};
		return site_obj;
	}
};