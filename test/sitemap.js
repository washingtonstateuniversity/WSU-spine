module.exports = {
	get_site_obj: function () {
		var site_obj = {
			globals:{
				google_analytics:""
			},
			page_defaults:{
				root : "build/tests/",
				nav_root : "tests/",
				template : "main"
			},
			pages:{
				index:{
					name : "index",
					nav_link : "",
					title : "WSU Test unit",
					vars : {
						"demo":true,
					}
				},
				markup : {
					nav_link : 'spine.html',
					root : "../",
					vars : {
						markup : true,
						content: true,
					}
				},
				markup_min : {
					nav_link : 'spine.min.html',
					root : "../",
					vars : {
						markup_min : true
					}
				},
				demo : {
					nav_link : 'demo.html',
					nav_title:"Demo",
					title : "Basic Demo",
					vars : {
						demo : true
					}
				},
				opensans : {
					nav_link : 'opensans.html',
					nav_title:"Open Sans",
					title : "Testing Open Sans",
					vars : {
						opensans : true,
						typography: true
					}
				},
				columns : {
					nav_link : 'columns.html',
					nav_title:"Columns",
					title: 'Testing Columns',
					vars : {
						columns : true,
					}
				},
				spacing : {
					nav_link : 'spacing.html',
					nav_title:"Gutters and Pads",
					title: 'Testing Gutters and Pads',
					vars : {
						spacing : true,
					}
				},
				mainheader : {
					nav_link : 'mainheader.html',
					nav_title:"Main Header",
					title: 'Testing the Main Header',
					vars : {
						mainheader : true,
						content: true
					}
				},
				typography : {
					nav_link : 'typography.html',
					title: 'Testing Typography',
					vars : {
						typography: true
					}
				},
				grid_fluid : {
					nav_link : 'grid_fluid.html',
					nav_title:"Fluid and Flex",
					title: 'Testing Fluid Grid',
					vars : {
						behavior : 'fluid',
						content: true
					}
				},
				grid_hybrid : {
					nav_link : 'grid_hybrid.html',
					nav_title:"Fold then Flex",
					title: 'Testing Hybrid Grid',
					vars : {
						hybridGrid : true,
						content: true
					}
				},
				grid_fixed : {
					nav_link : 'grid_fixed.html',
					nav_title:"Fixed and Fold",
					title: 'Testing Fixed Grid',
					vars : {
						fixedGrid : true,
						content: true
					}
				},
				broken : {
					nav_link : 'binding_broken.html',
					nav_title : 'Broken Binding',
					title: 'Testing Broken Binding',
					vars : {
						broken : true,
						behavior : 'fluid',
						content : true
					}
				},
				unbound : {
					nav_link : 'unbound.html',
					nav_title : 'Unbound and Rebound',
					title: 'Testing Unbound and Rebound',
					vars : {
						unbound : true
					}
				},
				ui : {
					nav_link : 'ui.html',
					nav_title: 'Behavior',
					title: 'User Interaction Elements',
					vars : {
						ui : true
					}
				},
				search_tabs : {
					nav_link : 'search_tabs.html',
					nav_title : 'Local Defined Search',
					vars : {
						filledSearchTab : true,
						content: true
					}
				},
				contact_malformed : {
					nav_link : 'contact_malformed.html',
					nav_title : 'malformed Contact',
					vars : {
						malformed : true,
						content: true,
						location : 'https://repo.wsu.edu/spine'
					}
				},
				contact_filled : {
					nav_link : 'contact_filled.html',
					nav_title : 'Prefilled Contact',
					vars : {
						malformed : 'false',
						content: true
					}
				},
				contact_double : {
					nav_link : 'contact_double.html',
					nav_title : 'Contact doubling',
					vars : {
						doubledContact : true,
						content: true
					}
				},
				navdata : {
					nav_link : 'nav-data-links.html',
					nav_title : 'Nav data intergration',
					vars : {
						navdata : true,
						content: true,
						location : 'https://repo.wsu.edu/spine'
					}
				},
				overly : {
					nav_link : 'overly.html',
					nav_title: 'Overly Overly',
					vars : {
						manyLinks : true,
						showLong : true
					}
				},
				overly_linked : {
					nav_link : 'overly_linked.html',
					nav_title: 'Overly Linked',
					vars : {
						manyLinks : true,
						content: true,
						location : 'https://repo.wsu.edu/spine'
					}
				},
				overly_long : {
					nav_link : 'overly_long.html',
					nav_title: 'Overly Long',
					vars : {
						showLong : true
					}
				},
				cropped : {
					nav_link : 'cropped.html',
					title: 'Testing Cropped Spine',
					vars : {
						cropped : true,
						content: true
					}
				},

				js_units:{
					nav_link : 'js-units.html',
					title: 'Unit Testing',
					vars : {
						fixedGrid : true,
						unit_tests: true
					}
				}
				/*"development":{
					name : "development",
					title : "WSU Serverbase development guide",
					"nav_title":"Development",
					vars : {
					"showstuff":true
					},
					"child_nav":{
					"#vagrant-options":"Vagrant Options",
						"#how-to-add-a-web-app-":"Load Web Apps",
						"#sample-working-file":"Sample Config"
					}
				}*/
			}
		};
		return site_obj;
	},
};
	
	
	
