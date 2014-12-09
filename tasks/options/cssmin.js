module.exports = {
	combine: {
		files: {
			// Hmmm, in reverse order (see http://gruntjs.com/configuring-tasks#files-object-format)
			'<%= config.build %>/spine.min.css': ['<%= config.build %>/spine.css']
		}
	}
}