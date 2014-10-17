module.exports = {
	files: ['Gruntfile.js', 'scripts/*.js'],
	options: {
		// options here to override JSHint defaults
		boss: true,
		curly: true,
		eqeqeq: true,
		eqnull: true,
		expr: true,
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
			window:true
		}
	}
}