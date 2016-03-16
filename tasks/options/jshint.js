module.exports = {
	files: ["Gruntfile.js", "test/*", "tasks/*", "scripts/*.js"],
	options: {
		// options here to override JSHint defaults
		curly: true,
		eqeqeq: true,
		immed: true,
		noarg: true,
		onevar: true,
		quotmark: "double",
		smarttabs: true,
		trailing: true,
		undef: true,
		unused: true,
		globals: {
			jQuery: true,
			console: true,
			module: true,
			document: true,
			window:true,
			MutationObserver:true
		}
	}
};