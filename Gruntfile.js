module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
		my_target: {
			files: {
				'dist/js/cipher.min.js': ['js/vendor/jquery-2.1.4.js', 'js/vendor/jquery.mobile-1.4.5.js', 
				'js/_cipherHelper.js', 'js/rot13.js', 'js/atbash.js', 'js/letterNumbers.js', 'js/baconian.js', 'js/binary.js']
			}
		}
    },
	// watch: {
		// js: {
			// files: {
				// 'dist/js/cipher.min.js': ['js/main.js', 'js/rot13.js', 'js/atbash.js', 'js/letterNumbers.js', 'js/baconian.js']
			// },
			// tasks: ['uglify']
		// }
	// },
	jshint: {
		all: ['Gruntfile.js', 'js/**/*.js']
	}
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};