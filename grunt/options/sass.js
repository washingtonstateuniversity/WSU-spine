module.exports = {
	dev: {
		files: [
			{ src: 'styles/sass/spine.scss', dest: 'tmp/css/spine.css' },
			{ src: 'styles/sass/opensans.scss', dest: '<%= config.build %>/styles/opensans.css' }
		]
	}
}