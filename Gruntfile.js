
module.exports = function(grunt) {
	// Look at the passed path for .js files used as extended Grunt config.
	function loadConfig(path) {
		var glob = require('glob');

		var object = {};
		var key;

		glob.sync('*', {cwd: path}).forEach(function(option) {
			key = option.replace(/\.js$/,'');
			object[key] = require(path + option);
		});

		return object;
	}

	var pkg,setbase,config;

	pkg = grunt.file.readJSON('package.json');
	setbase = grunt.option('setbase') || pkg.build_location+'/'+pkg.build_version+'/';

	config = {
		pkg: grunt.file.readJSON('package.json'),
		setbase:setbase,
		config: {
			build: 'build'
		}
	};

	grunt.util._.extend(config, loadConfig('./grunt/options/'));
	grunt.initConfig(config);

	require('load-grunt-tasks')(grunt);

	// Default task(s).
	grunt.registerTask('default', ['jshint']);

	grunt.registerTask('prod', [
		'env:prod',
		'build'
	]);

	grunt.registerTask('dev', [
		'jshint',
		'env:dev',
		'build'
	]);

	grunt.registerTask('build', [
		'clean',
		'sass:dev',
		'concat',
		'preprocess:js',
		'cssmin',
		'uglify',
		'copy',
		'includereplace',
		'preprocess:html',
		'preprocess:opensans',
		'preprocess:columns',
		'preprocess:spacing',
		'preprocess:mainheader',
		'preprocess:typography',
		'preprocess:broken',
		'preprocess:unbound',
		'preprocess:ui',
		'preprocess:tu_search_tabs',
		'preprocess:tu_contact_malformed',
		'preprocess:tu_contact_filled',
		'preprocess:tu_contact_double',
		'preprocess:tu_overly',
		'preprocess:tu_overly_long',
		'preprocess:tu_overly_linked',
		'preprocess:tu_cropped',
		'preprocess:grid_fluid',
		'preprocess:grid_hybrid',
		'preprocess:grid_fixed',
		'preprocess:tu_navdata',
		'preprocess:markup',
		'preprocess:markup_min',
		'preprocess:demo'
	]);
};
