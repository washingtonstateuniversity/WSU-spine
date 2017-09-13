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

				overview_grids: {
					title: "Testing Overview anchors in the navigation",
					nav: {
						nav_link: "overview_grids.html",
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
						demo: true
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
						demo: true
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
						demo: true
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
						nav_title: "Types of Content"
					}
				},

				typography: {
					title: "Typography",
					nav: {
						parent: "Types of Content",
						nav_link: "typography.html",
						nav_title: "Typography"
					},
					vars: {
						typography: true
					}
				},

				ui: {
					title: "User Interaction Elements",
					nav: {
						parent: "Types of Content",
						nav_link: "ui.html",
						nav_title: "User Interfaces"
					},
					vars: {
						ui: true
					}
				},

				_testing: {
					file: false,
					nav: {
						nav_link: "#",
						nav_title: "Navigation and Content"
					}
				},

				overly: {
					title: "Long Navigation, Long Content",
					nav: {
						parent: "Navigation and Content",
						nav_link: "overly.html",
						nav_title: "Long Navigation, Long Content"
					},
					vars: {
						manyLinks: true,
						showLong: true
					}
				},

				overly_linked: {
					title: "Long Navigation, Short Content",
					nav: {
						parent: "Navigation and Content",
						nav_link: "overly_linked.html",
						nav_title: "Long Navigation, Short Content"
					},
					vars: {
						manyLinks: true,
						content: true,
						location: "https://repo.wsu.edu/spine"
					}
				},

				overly_long: {
					title: "Normal Navigation, Long Content",
					nav: {
						parent: "Navigation and Content",
						nav_link: "overly_long.html",
						nav_title: "Normal Navigation, Long Content"
					},
					vars: {
						showLong: true
					}
				},

				short_navigation_normal_content: {
					title: "Short Navigation, Normal Content",
					nav: {
						parent: "Navigation and Content",
						nav_link: "short_navigation_normal_content.html",
						nav_title: "Short Navigation, Normal Content"
					},
					vars: {
						short_nav: true,
						content: true
					}
				},

				anchored: {
					nav: {
						parent: "Navigation and Content",
						nav_link: "anchored.html",
						nav_title: "Anchored page"
					},
					vars: {
						anchored: true
					}
				},

				_miscellaneous : {
					file: false,
					nav: {
						nav_link: "#",
						nav_title: "Miscellaneous"
					}
				},

				search_tabs: {
					title: "Test the search tab with a CMS defined search",
					nav: {
						parent: "Miscellaneous",
						nav_link: "search_tabs.html",
						nav_title: "CMS Defined Search"
					},
					vars: {
						filledSearchTab: true,
						content: true
					}
				},

				contact_malformed: {
					nav: {
						parent: "Miscellaneous",
						nav_link: "contact_malformed.html",
						nav_title: "Malformed Contact HTML"
					},
					vars: {
						malformed: true,
						content: true
					}
				},

                wp_admin_bar_short_child: {
                    nav: {
                        parent: "Miscellaneous",
                        nav_link: "wp_admin_bar_short_child.html",
                        nav_title: "WP Admin Bar Short"
                    },
                    vars: {
                        wp_admin: true,
                        content: true
                    }
                },

                wp_admin_bar_long_child: {
                    nav: {
                        parent: "Miscellaneous",
                        nav_link: "wp_admin_bar_long_child.html",
                        nav_title: "WP Admin Bar Long"
                    },
                    vars: {
                        wp_admin: true,
                        showLong: true
                    }
                },

				wp_admin_bar_short: {
					nav: {
						nav_link: "wp_admin_bar_short.html",
						nav_title: "WP Admin Bar Short"
					},
					vars: {
						wp_admin: true,
						content: true
					}
				},

                wp_admin_bar_long: {
                    nav: {
                        nav_link: "wp_admin_bar_long.html",
                        nav_title: "WP Admin Bar Long"
                    },
                    vars: {
                        wp_admin: true,
                        showLong: true
                    }
                }
			}
		};
		return site_obj;
	}
};
