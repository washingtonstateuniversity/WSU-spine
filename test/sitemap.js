module.exports = {
	get_site_obj: function () {
		var site_obj = {
			globals:{
				google_analytics:""
			},
			page_defaults:{
				file_root : "build/tests/",
				nav_root : "tests/",
				template : "main"
			},
			pages:{
				/* note that these first files are not inclucded in the test suite nav */
				markup : {
					file : 'spine.min.html',
					file_root : "",
					nav:false,
					vars : {
						markup : true,
						content: true,
					}
				},
				markup_min : {
					file : 'spine.min.html',
					file_root : "",
					nav:false,
					vars : {
						markup_min : true
					}
				},
				/* end of navless */
				index:{
					name : "index",
					title : "WSU Test unit",
					nav:{
						nav_link : "index.html",
					},
				},
				demo : {
					title : "Basic Demo",
					nav:{
						nav_link : 'demo.html',
						nav_title:"Demo",
					},
					vars : {
						demo : true
					}
				},
				opensans : {
					title : "Testing Open Sans",
					nav:{
						nav_link : 'opensans.html',
						nav_title:"Open Sans",
					},
					vars : {
						opensans : true,
						typography: true
					}
				},
				columns : {
					title: 'Testing Columns',
					nav:{
						nav_link : 'columns.html',
						nav_title:"Columns",
					},
					vars : {
						columns : true,
					}
				},
				spacing : {
					title: 'Testing Gutters and Pads',
					nav:{
						nav_link : 'spacing.html',
						nav_title:"Gutters and Pads",
					},
					vars : {
						spacing : true,
					}
				},
				mainheader : {
					title: 'Testing the Main Header',
					nav:{
						nav_link : 'mainheader.html',
						nav_title:"Main Header",
					},
					vars : {
						mainheader : true,
						content: true
					}
				},
				typography : {
					title: 'Testing Typography',
					nav:{
						nav_link : 'typography.html',
					},
					vars : {
						typography: true
					}
				},
				grid_fluid : {
					title: 'Testing Fluid Grid',
					nav:{
						nav_link : 'grid_fluid.html',
						nav_title:"Fluid and Flex",
					},
					vars : {
						behavior : 'fluid',
						content: true
					}
				},
				grid_hybrid : {
					title: 'Testing Hybrid Grid',
					nav:{
						nav_link : 'grid_hybrid.html',
						nav_title:"Fold then Flex",
					},
					vars : {
						hybridGrid : true,
						content: true
					}
				},
				grid_fixed : {
					title: 'Testing Fixed Grid',
					nav:{
						nav_link : 'grid_fixed.html',
						nav_title:"Fixed and Fold",
					},
					vars : {
						fixedGrid : true,
						content: true
					}
				},
				broken : {
					title: 'Testing Broken Binding',
					nav:{
						nav_link : 'binding_broken.html',
						nav_title : 'Broken Binding',
					},
					vars : {
						broken : true,
						behavior : 'fluid',
						content : true
					}
				},
				unbound : {
					title: 'Testing Unbound and Rebound',
					nav:{
						nav_link : 'unbound.html',
						nav_title : 'Unbound and Rebound',
					},
					vars : {
						unbound : true
					}
				},
				ui : {
					title: 'User Interaction Elements',
					nav:{
						nav_link : 'ui.html',
						nav_title: 'Behavior',
					},
					vars : {
						ui : true
					}
				},
				search_tabs : {
					title: 'Testing serach tab',
					nav:{
						nav_link : 'search_tabs.html',
						nav_title : 'Local Defined Search',
					},
					vars : {
						filledSearchTab : true,
						content: true
					}
				},
				contact_malformed : {
					nav:{
						nav_link : 'contact_malformed.html',
						nav_title : 'malformed Contact',
					},
					vars : {
						malformed : true,
						content: true,
						location : 'https://repo.wsu.edu/spine'
					}
				},
				contact_filled : {
					nav:{
						nav_link : 'contact_filled.html',
						nav_title : 'Prefilled Contact',
					},
					vars : {
						malformed : 'false',
						content: true
					}
				},
				contact_double : {
					nav:{
						nav_link : 'contact_double.html',
						nav_title : 'Contact doubling',
					},
					vars : {
						doubledContact : true,
						content: true
					}
				},
				nav_data_links : {
					nav:{
						nav_link : 'nav_data_links.html',
						nav_title : 'Nav data intergration',
					},
					vars : {
						navdata : true,
						content: true,
						location : 'https://repo.wsu.edu/spine'
					}
				},
				overly : {
					nav:{
						nav_link : 'overly.html',
						nav_title: 'Overly Overly',
					},
					vars : {
						manyLinks : true,
						showLong : true
					}
				},
				overly_linked : {
					nav:{
						nav_link : 'overly_linked.html',
						nav_title: 'Overly Linked',
					},
					vars : {
						manyLinks : true,
						content: true,
						location : 'https://repo.wsu.edu/spine'
					}
				},
				overly_long : {
					nav:{
						nav_link : 'overly_long.html',
						nav_title: 'Overly Long',
					},
					vars : {
						showLong : true
					}
				},
				cropped : {
					title: 'Testing Cropped Spine',
					nav:{
						nav_link : 'cropped.html',
					},
					vars : {
						cropped : true,
						content: true
					}
				},

				js_units:{
					title: 'Unit Testing',
					nav:{
						nav_link : 'js-units.html',
					},
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
	
	
	
