module.exports = {
	scripts: {
		src: [
			'scripts/debug.js',
			'scripts/wsu_autocomplete.js',
			'scripts/ui.spine.js',
			'scripts/ui.spine.framework.js',
			'scripts/ui.spine.search.js',
			'scripts/ui.spine.social.js',
			'scripts/ui.spine.analytics.js',
			'scripts/spine.js'
		],
		dest: '<%= config.build %>/spine.js'
	}
}