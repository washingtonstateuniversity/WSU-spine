module.exports = {
	grunt_files : {
		src: [ "Gruntfile.js", "tasks/*", "test/sitemap.js" ],
		options: {
			curly: true,
			eqeqeq: true,
			noarg: true,
			quotmark: "double",
			undef: true,
			unused: true,
			node: true     // Define globals available when running in Node.
		}
	},
	spine_files : {
		src: [ "scripts/*.js" ],
		options: {
			bitwise: true,
			curly: true,
			eqeqeq: true,
			forin: true,
			freeze: true,
			noarg: true,
			nonbsp: true,
			quotmark: "double",
			undef: true,
			unused: true,
			browser: true, // Define globals exposed by modern browsers.
			jquery: true   // Define globals exposed by jQuery.
		}
	}
};