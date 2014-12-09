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
						"showstuff":true
					}
				},
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
	
	
	
