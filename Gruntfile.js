/*
 * angular-liferay-base
 * https://github.com/smile-sa/angular-liferay-base
 *
 * Copyright (c) 2015 Smile
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	var banner = '/*! <%= pkg.name %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n';

	// Project configuration.
	grunt.initConfig({
		pkg : require('./bower.json'),

		jshint : {
			options : {
				jshintrc : '.jshintrc',
			},
			all : [ 'Gruntfile.js', 'src/*.js' ]
		},

		jscs: {
			options: {
				config: ".jscsrc"
			},
			all: {
				src: [ 'src/*.js' ]
			}
		},

		jsbeautifier: {
			options: {
				config: '.jsbeautifier'
			},
			all: [ 'src/*.js' ]
		},

		// Before generating any new files, remove any previously-created files.
		clean : {
			tests : [ 'tmp', 'dist' ],
		},

		ngAnnotate : {
			dist : {
				files : [ {
					expand : true,
					cwd : 'src',
					src : '*.js',
					dest : '.tmp'
				} ]
			}
		},

		concat : {
			options: {
				separator: ';\n',
				banner: '(function(angular, Liferay){\n',
				footer: '\n}(angular, Liferay));'
			},
			dist : {
				files : {
					'dist/angular-liferay-base.js' : [ '.tmp/init.js', '.tmp/app.js', '.tmp/*.js' ]
				}
			}
		},

		uglify : {
			min : {
				options : {
					mangle : true
				},
				expand : true,
				cwd : 'dist',
				src : '*.js',
				dest : 'dist',
				ext : '.min.js'
			}
		},

		release : {
			options : {
				tagName : 'v<%= version %>',
				additionalFiles: ['bower.json']
			}
		},

		removelogging : {
			dist : {
				src : 'dist/angular-liferay-base.js',
				dest : 'dist/angular-liferay-base-without-console.js'
			}
		},

		usebanner : {
			dist : {
				options : {
					position : 'top',
					banner : banner,
					linebreak : false
				},
				expand : true,
				cwd : 'dist',
				src : '*.js',
				dest : 'dist'
			}
		},

		watch : {
			test : {
				files : [ 'src/*.js' ],
				tasks : [ 'jasmine' ]
			}
		},
	});

	grunt.registerTask('default', [ 'clean', 'jsbeautifier', 'jshint', 'jscs', 'ngAnnotate', 'concat', 'removelogging', 'uglify', 'usebanner' ]);
};
