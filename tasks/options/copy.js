module.exports = {
	main: {
		files: [
			{ expand: true, src: ["fonts/*"], dest: "<%= config.build %>/", dot: true },
			{ expand: true, src: ["html/*"], dest: "<%= config.build %>/" },
			{ expand: true, src: ["icons/*"], dest: "<%= config.build %>/", dot: true },
			{ expand: true, src: ["marks/*"], dest: "<%= config.build %>/" },
			{ expand: true, src: ["scripts/*"], dest: "<%= config.build %>/" },
			{ expand: true, src: ["styles/jqueryui.css", "styles/styles.css"], dest: "<%= config.build %>/" },
			{ expand: true, src: ["spine.html","spine.min.html","authors.txt","favicon.ico"], dest: "<%= config.build %>/" }
		]
	},
	dev: {
		files: [
			{ flatten: true, expand: true, src: ["test/js/*"], dest: "<%= config.build %>/tests/js/" },
			{ flatten: true, expand: true, src: ["test/images/*"], dest: "<%= config.build %>/tests/images/" }
		]
	}
};