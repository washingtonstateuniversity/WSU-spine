module.exports = {
	get_site_obj: function () {
		var site_obj = {
			"globals":{
				"google_analytics":""
			},
			"page_defaults":{
				"root":"build/tests/",
				"nav_root":"tests/",
				"template":"main"
			},
			"pages":{
				"index":{
					"name":"index",
					"nav_link":"",
					"title":"WSU Test unit",
					"vars":{
						"demo":true,
					}
				},
				
				markup : {
					"nav_link":'spine.html',
					"vars":{
							markup : 'true',
							content: 'true',
					}
				},
				markup_min : {
					"nav_link":'spine.min.html',
					"vars":{
							markup_min : 'true',
							content: 'false'
					}
				},
				demo : {
					"nav_link":'demo.html',
					"vars":{
							demo : 'true',
							content: 'false'
					}
				},
				opensans : {
					"nav_link":'tests/opensans.html',
					"title":"Testing Open Sans",
					"vars":{
							opensans : 'true',
							content: 'false',
							typography: 'true'
					}
				},
				columns : {
					"nav_link":'tests/columns.html',
					title: 'Testing Columns',
					"vars":{
							columns : 'true',
							
					}
				},
				spacing : {
					"nav_link":'tests/spacing.html',
					title: 'Testing Gutters and Pads',
					"vars":{
							spacing : 'true',
					}
				},
				mainheader : {
					"nav_link":'tests/mainheader.html',
					title: 'Testing the Main Header',
					"vars":{
							mainheader : 'true',
							content: 'true'
					}
				},
				typography : {
					"nav_link":'tests/typography.html',
					title: 'Testing Typography',
					"vars":{
							typography: 'true'
					}
				},
				broken : {
					"nav_link":'tests/binding_broken.html',
					title: 'Testing Broken Binding',
					"vars":{
							broken : 'true',
							behavior : 'fluid',
							content : 'true'
					}
				},
				unbound : {
					"nav_link":'tests/unbound.html',
					title: 'Testing Unbound and Rebound',
					"vars":{
							unbound : 'true',
							content: 'false'
					}
				},
				ui : {
					"nav_link":'tests/ui.html',
					title: 'User Interaction Elements',
					"vars":{
							ui : 'true'
					}
				},
				tu_search_tabs : {
					"nav_link":'tests/search_tabs.html',
					"vars":{
							filledSearchTab : 'true',
							content: 'true'
					}
				},
				tu_contact_malformed : {
					"nav_link":'tests/contact_malformed.html',
					"vars":{
							malformed : 'true',
							content: 'true',
							location : 'https://repo.wsu.edu/spine'
					}
				},
				tu_contact_filled : {
					"nav_link":'tests/contact_filled.html',
					"vars":{
							malformed : 'false',
							content: 'true'
					}
				},
				tu_contact_double : {
					"nav_link":'tests/contact_double.html',
					"vars":{
							doubledContact : 'true',
							content: 'true'
					}
				},
				tu_navdata : {
					"nav_link":'tests/nav-data-links.html',
					"vars":{
							navdata : 'true',
							content: 'true',
							location : 'https://repo.wsu.edu/spine'
					}
				},
				tu_overly : {
					"nav_link":'tests/overly.html',
					"vars":{
							manyLinks : 'true',
							showLong : 'true'
					}
				},
				tu_overly_long : {
					"nav_link":'tests/overly_long.html',
					"vars":{
							showLong : 'true'
					}
				},
				tu_overly_linked : {
					"nav_link":'tests/overly_linked.html',
					"vars":{
							manyLinks : 'true',
							content: 'true',
							location : 'https://repo.wsu.edu/spine'
					}
				},
				tu_cropped : {
					"nav_link":'tests/cropped.html',
					title: 'Testing Cropped Spine',
					"vars":{
							cropped : 'true',
							content: 'true'
					}
				},
				grid_fluid : {
					"nav_link":'tests/grid_fluid.html',
					title: 'Testing Fluid Grid',
					"vars":{
							behavior : 'fluid',
							content: 'true'
					}
				},
				grid_hybrid : {
					"nav_link":'tests/grid_hybrid.html',
					title: 'Testing Hybrid Grid',
					"vars":{
							hybridGrid : 'true',
							content: 'true'
					}
				},
				grid_fixed : {
					"nav_link":'tests/grid_fixed.html',
					title: 'Testing Fixed Grid',
					"vars":{
							fixedGrid : 'true',
							content: 'true'
					}
				},
				js_units:{
					"nav_link":'tests/js-units.html',
					title: 'Unit Testing',
					"vars":{
							fixedGrid : 'true',
							unit_tests: 'true'
					}
				}
				
				
				
				
				
				
				/*"development":{
					"name":"development",
					"title":"WSU Serverbase development guide",
					"nav_title":"Development",
					"vars":{
					"showstuff":true
					},
					"child_nav":{
					"#vagrant-options":"Vagrant Options",
						"#how-to-add-a-web-app-":"Load Web Apps",
						"#sample-working-file":"Sample Config"
					}
				},
				"production":{
					"name":"production",
					"title":"WSU Server Production Environment",
					"nav_title":"Production",
					"vars":{
					"showstuff":true
					}
				},
				"troubleshooting":{
					"name":"troubleshooting",
					"title":"Trouble Shooting",
					"nav_title":"Trouble Shooting",
					"vars":{
					"showstuff":true
					}
				}*/
			}
		};
		
		return site_obj;
	},
					};
	
	
	
