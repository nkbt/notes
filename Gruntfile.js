'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		mocha_phantomjs: {
			options: {
				reporter: 'tap'
			},
			all: ['src/test/**/*.html']
		},
		requirejs: {
			compile: {
				options: {
					baseUrl: 'js',
					appDir: 'tmp/src',
					dir: 'build',
					siteRoot: '../',
					modules: [
						{
							name: 'main'
						}
					],
					paths: {
					},
					mainConfigFile: './tmp/src/js/main.js',
					useStrict: true,
					generateSourceMaps: true,
					preserveLicenseComments: false,
					findNestedDependencies: true,
					optimize: 'uglify2',

					buildCSS: true,
					separateCSS: false,
					optimizeCss: "node",
					cssBase: "css/"
				}

			}
		},
		jshint: {
			options: {
			},
			browser: {
				src: ['src/js/**/*.js', '!src/js/bower/**/*.js', '!src/js/vendor/**/*.js', '!src/js/entity/**/*.js'],
				options: {
					jshintrc: 'src/.jshintrc'
				}
			},
			test: {
				src: ['test/**/*.js'],
				options: {
					jshintrc: 'test/.jshintrc'
				}
			}
		},
		watch: {
			browser: {
				files: ['src/js/**/*.js', '!src/js/vendor/**/*.js', '!src/js/entity/**/*.js'],
				tasks: ['jshint:browser']
			},
			gleam: {
				files: ['gleams/*.js', 'gleams/**/*.js'],
				tasks: ['gleam:build']
			}
		},
		gleambuild: {
			build: {
			}
		},
		svgmin: {
			options: {
				plugins: [
					{
						removeViewBox: false
					},
					{
						removeUselessStrokeAndFill: false
					}
				]
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: 'tmp/src/img',
						src: ['**/*.svg'],
						dest: 'tmp/src/img',
						ext: '.svg'
					}
				]
			}
		},
		clean: {
			entity: {
				src: 'src/js/entity/**/*.js'
			},
			build: {
				src: 'build/'
			},
			tmp: {
				src: 'tmp/'
			},
			bower: {
				src: 'src/*/bower'
			}
		},
		copy: {
			main: {
				files: [
					{
						expand: true,
						src: ['src/**', '!src/test/**', '!src/.jshintrc'],
						dest: 'tmp/'
					}
				]
			}
		},
		autoprefixer: {
			options: {
				browsers: ['last 2 versions']
			},
			dist: {
				expand: true,
				src: 'tmp/src/css/**/*.css'
			}
		},
		'bower-install-simple': {
			options: {
			}
		},
		bower: {
			main: {
				dest: 'src/js/bower',
				css_dest: 'src/css/bower',
				html_dest: 'src/templates/bower',
				options: {
					expand: true,
					packageSpecific: {
						history: {
							files: [
								'scripts/bundled-uncompressed/html5/native.history.js'
							]
						}
					}
				}
			}
		}
	});

	grunt.registerMultiTask('gleambuild', 'Convert Gleams for browser', function () {
		var Gleam = require('gleam'),
			path = require('path');
		return Gleam.buildSync(path.join(__dirname, 'gleams'), path.join(__dirname, 'src', 'js', 'entity'));
	});

	grunt.loadNpmTasks('grunt-mocha-phantomjs');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-bower-install-simple');
	grunt.loadNpmTasks('grunt-bower');

	grunt.registerTask('gleam', ['clean:entity', 'gleambuild']);
	grunt.registerTask('install', ['bower-install-simple', 'bower']);
	grunt.registerTask('test', ['jshint', 'gleam', 'mocha_phantomjs']);
	grunt.registerTask('build', ['clean:build', 'gleam', 'copy', 'autoprefixer', 'svgmin', 'requirejs', 'clean:tmp']);
	grunt.registerTask('default', ['install', 'test', 'build']);
	grunt.registerTask('frontend', ['jshint:browser', 'jshint:test', 'mocha_phantomjs']);
};
