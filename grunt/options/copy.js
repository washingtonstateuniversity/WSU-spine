module.exports = {
	main: {
		files: [ // This can be drastically simplified by putting this stuff in a `src` folder.
			{ expand: true, src: ['fonts/*'], dest: '<%= config.build %>/', dot: true },
			{ expand: true, src: ['html/*'], dest: '<%= config.build %>/' },
			{ expand: true, src: ['icons/*'], dest: '<%= config.build %>/', dot: true },
			{ expand: true, src: ['images/**'], dest: '<%= config.build %>/' },
			{ expand: true, src: ['marks/*'], dest: '<%= config.build %>/' },
			{ expand: true, src: ['scripts/*'], dest: '<%= config.build %>/' },
			{ expand: true, src: ['styles/jqueryui.css', 'styles/styles.css'], dest: '<%= config.build %>/' },
			{ expand: true, src: ['spine.html','spine.min.html','authors.txt','favicon.ico'], dest: '<%= config.build %>/' }
		]
	}
}