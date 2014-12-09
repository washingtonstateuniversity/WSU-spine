module.exports = {
	html: {
		files: ['test/*.html'],
		tasks: ['dev'],
		options: {
			livereload: true
		}
	},
	js: {
		files: ['scripts/*.js'],
		tasks: ['dev']
	},
	css: {
		files: ['styles/*.css'],
		tasks: ['dev']
	},
	sass: {
		files: ['styles/sass/**/*.scss'],
		tasks: ['dev']
	}
}