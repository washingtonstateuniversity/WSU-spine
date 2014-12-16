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
					file_root : "build",
					nav:false,
					vars : {
						markup : true,
						content: true,
					}
				},
				markup_min : {
					file : 'spine.min.html',
					file_root : "build",
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
				_options : {
					file:false,
					nav:{
						nav_link : '#',
						nav_title : 'Options',
					}
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
						parent:"Options",
						nav_link : 'opensans.html',
						nav_title:"Open Sans",
					},
					vars : {
						opensans : true,
						typography: true
					}
				},
				
				_behaviors : {
					file:false,
					nav:{
						nav_link : '#',
						nav_title : 'Behavior',
					}
				},
				grid_fluid : {
					title: 'Testing Fluid Grid',
					nav:{
						parent:"Behavior",
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
						parent:"Behavior",
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
						parent:"Behavior",
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
						parent:"Behavior",
						nav_link : 'binding_broken.html',
						nav_title : 'Broken Binding',
					},
					vars : {
						broken : true,
						behavior : 'fluid',
						content : true
					}
				},
				responsiveness : {
					file:false,
					nav:{
						parent:"Behavior",
						nav_link : 'http://en.wikipedia.org/wiki/Responsive_web_design',
						nav_title : 'On Responsiveness',
					}
				},


				
				
				
				_layouts : {
					file:false,
					nav:{
						nav_link : '#',
						nav_title : 'Layouts and Columns',
					}
				},
				
				columns : {
					title: 'Testing Columns',
					nav:{
						parent:'Layouts and Columns',
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
						parent:'Layouts and Columns',
						nav_link : 'spacing.html',
						nav_title:"Gutters and Pads",
					},
					vars : {
						spacing : true,
					}
				},
				
				
				_content : {
					file:false,
					nav:{
						nav_link : '#',
						nav_title : 'Main/Content',
					}
				},
				
				mainheader : {
					title: 'Testing the Main Header',
					nav:{
						parent:'Main/Content',
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
						parent:'Main/Content',
						nav_link : 'typography.html',
					},
					vars : {
						typography: true
					}
				},
				unbound : {
					title: 'Testing Unbound and Rebound',
					nav:{
						parent:'Main/Content',
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
						parent:'Main/Content',
						nav_link : 'ui.html',
						nav_title: 'Behavior',
					},
					vars : {
						ui : true
					}
				},
				
				

				
				
				_broken : {
					file:false,
					nav:{
						nav_link : '#',
						nav_title : 'Broken',
					}
				},
				
				contact_malformed : {
					nav:{
						parent:'Broken',
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
						parent:'Broken',
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
						parent:'Broken',
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
						parent:'Broken',
						nav_link : 'nav_data_links.html',
						nav_title : 'Nav data intergration',
					},
					vars : {
						navdata : true,
						content: true,
						location : 'https://repo.wsu.edu/spine'
					}
				},
				search_tabs : {
					title: 'Testing serach tab',
					nav:{
						parent:'Broken',
						nav_link : 'search_tabs.html',
						nav_title : 'Local Defined Search',
					},
					vars : {
						filledSearchTab : true,
						content: true
					}
				},
				
				
				_testing : {
					file:false,
					nav:{
						nav_link : '#',
						nav_title : 'Testing Units',
					}
				},
				overly : {
					nav:{
						parent:"Testing Units",
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
						parent:"Testing Units",
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
						parent:"Testing Units",
						nav_link : 'overly_long.html',
						nav_title: 'Overly Long',
					},
					vars : {
						showLong : true
					}
				},
				cropped : {
					nav:{
						parent:"Testing Units",
						nav_link : 'cropped.html',
						nav_title: 'Testing Cropped Spine',
					},
					vars : {
						cropped : true,
						content: true
					}
				},
				anchored : {
					nav:{
						parent:"Testing Units",
						nav_link : 'anchored.html',
						nav_title: 'Anchored page',
					},
					vars : {
						anchored: true
					}
				},
				js_units:{
					title: 'Unit Testing',
					nav:{
						parent:"Testing Units",
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
	
	
	
