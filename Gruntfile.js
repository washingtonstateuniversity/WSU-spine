/* globals require */
module.exports = function( grunt ) {
	// Look at the passed path for .js files used as extended Grunt config.
	function loadConfig( path ) {
		var glob = require( "glob" );
		var object = {};
		var key;

		glob.sync( "*", { cwd: path } ).forEach( function( option ) {
			key = option.replace( /\.js$/, "" );
			object[ key ] = require( path + option );
		} );

		return object;
	}

	var pkg, config;

	pkg = grunt.file.readJSON( "package.json" );

	config = {
		pkg: pkg,
		config: {
			build: "build"
		}
	};

	grunt.util._.extend( config, loadConfig( "./tasks/options/" ) );
	grunt.initConfig( config );

	require( "load-grunt-tasks" )( grunt );
	grunt.loadTasks( "tasks" );

	// Default task(s).
	grunt.registerTask( "default", [ "dev" ] );

	grunt.registerTask( "prod", [ "build" ] );

	grunt.registerTask( "dev", [ "jscs", "jshint", "build" ] );

	grunt.registerTask( "build", [
		"clean",
		"sass:dev",
		"env:prod",
		"concat",
		"postcss",
		"csslint",
		"cssmin",
		"uglify",
		"build_tests",
		"copy"
	] );
};
