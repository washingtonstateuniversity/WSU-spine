module.exports = { // https://github.com/alanshaw/grunt-include-replace
	dist: {
		options: {
			globals: {
				var1: 'one',
				var2: 'two',
				var3: 'three'
			}
		},
		src: 'test/preprocess/test.pre.html',
		dest: 'test/preprocess/test.cat.pre.html'
	}
}