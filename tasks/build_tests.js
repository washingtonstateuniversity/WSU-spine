/* global require */
module.exports = function(grunt) {
	grunt.registerTask("build_tests", "Set up all test pages", function() {
		var fs = require("fs");
		var extend = require("extend");
		var wrench = require("wrench");
			//util = require("util");
		var nunjucks = require("nunjucks"),
			markdown = require("nunjucks-markdown");
		var env = nunjucks.configure("test");
		env.addFilter("indexof", function(str, cmpstr) {
			return str.indexOf(cmpstr);
		});
		var marked = require("marked");
			markdown.register(env,{
				renderer: new marked.Renderer(),
				gfm: true,
				tables: true,
				breaks: false,
				pendantic: false,
				sanitize: false,
				smartLists: true,
				smartypants: false
			});
		var done = this.async();
		
		grunt.log.writeln("Set up all test pages");
		
		// Include sitemap.js" to get the dynamic configuration
		var _sitemap = require("../test/sitemap");

		var sitemap = _sitemap.get_site_obj();
		var defaults = sitemap.page_defaults;
		//console.log("site_obj: %j", sitemap);
		wrench.mkdirSyncRecursive("build/tests", 0777);

		/*
		 * This will apply defaults and build the nav
		 */
		function build_site_obj(){
			var nav = {};
			for (var page_key in sitemap.pages) {
				//grunt.log.writeln("working "+page_key);

				//apply defaults were needed
				sitemap.pages[page_key].nav_key = page_key;
				//note extend will not work here, for some reason it'll alter the ref of defaults
				//we'll have to do it by hand for the moment
				for (var objKey in defaults){
					if(typeof sitemap.pages[page_key][objKey] === "undefined"){
						sitemap.pages[page_key][objKey] = defaults[objKey];
					}
				}
				
				//build nav
				var pagenav = sitemap.pages[page_key].nav!==undefined ? sitemap.pages[page_key].nav:{};
				if(pagenav!==false){
					var tmpobj={};
					var root = sitemap.pages[page_key].nav_root.replace(new RegExp("[\/]+$", "g"), "");

					var linkTitle = sitemap.pages[page_key].title;
					if(typeof pagenav.nav_title !== "undefined" ){
						linkTitle = pagenav.nav_title;
					}
					if(typeof pagenav.parent !== "undefined" && typeof nav[pagenav.parent] !== "undefined" ){
						var pnav = nav[pagenav.parent];
						var exnav = {};
						var exurl = linkTitle;
						if(typeof pagenav.nav_link !== "undefined" ){
							exurl=pagenav.nav_link;
						}else{
							exurl=root+"/"+sitemap.pages[page_key].nav_key+".html";
						}
						exnav[linkTitle] = exurl;

						var tmp = {};
						if(typeof pnav==="object"){
							tmp=extend(pnav,exnav);
						}else{
							tmp[pagenav.parent]=pnav;
						}
						exnav = extend(tmp,exnav);
						nav[pagenav.parent] = exnav;
						
					}else{
						if(typeof pagenav.nav_link !== "undefined" ){
							tmpobj[linkTitle]=pagenav.nav_link;
						}else{
							tmpobj[linkTitle]=root+"/"+sitemap.pages[page_key].nav_key+".html";
						}
					}
					if(typeof pagenav.child_nav !== "undefined"){
						var r = tmpobj[linkTitle];
						var navarray = {};
						
						var mainlink= sitemap.pages[page_key].title;
						if(typeof pagenav.nav_title !== "undefined" ){
							mainlink = pagenav.nav_title;
						}
						navarray[mainlink] = r;
						for (var link in pagenav.child_nav){
							var url = link;
							var title = pagenav.child_nav[link];
							if(link.indexOf("#")===0){
								url=r+link;
							}
							navarray[title] = url;
						}
						tmpobj[linkTitle]=navarray;
					}
					nav = extend(nav,tmpobj);
				}
				//grunt.log.writeln("worked "+page_key);
			}
			sitemap.nav = nav;
		}

		build_site_obj();
			
		/*
		 * Construct the static pages
		 */
		function build_page(){
			//console.log(sitemap);
			for (var key in sitemap.pages) {

				var site_obj = sitemap;
				var page_obj = site_obj.pages[key];
				if(page_obj.file!==false){
					var sourceFile = "test/preprocess/"+page_obj.template+".tmpl";
					//var tmpFile = "build/deletable.tmp";
					var root = page_obj.file_root.replace(new RegExp("[\/]+$", "g"), "");

					var page = page_obj.file || page_obj.nav_key+".html";
					var targetFile = root+"/"+page;
					var content = fs.readFileSync(sourceFile,"utf8");

					site_obj.current_page=page;
					site_obj.current_build=page_obj.nav_key;
					//grunt.log.writeln("building "+targetFile);
					var tmpl = new nunjucks.Template(content,env);
					//grunt.log.writeln(targetFile + " compiled");
					var res = tmpl.render(site_obj);
					grunt.log.writeln("building "+targetFile);
					fs.writeFile(targetFile, res, function(){
						//grunt.log.writeln("wrote to file "+targetFile);
					});
				}
			}
		}
		build_page();
		done();
	});
};