module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: {
      preBuild: {
        expand: true,
        cwd: 'www/',
        src: '**/*'
      },
      postBuild: {
        expand: true,
        cwd: 'www/',
        src: [
          'angular/',
          'roboto-fontface/',
          'ua-core/',
          'ua-styles/',
          '**/*.js',
          '**/*.css',
          '**/*.scss',
          '!**/*.min.js',
          '!**/*.min.css'
        ]
      }
    },
    copy: {
      source: {
        expand: true,
        cwd: 'source/',
        dest: 'www/',
        src: '**/*'
      },
      angular: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/',
            dest: 'www/angular/',
            src: [
              'angular/angular.js',
              'angular-route/angular-route.js',
              'angular-resource/angular-resource.js',
              'angular-animate/angular-animate.js',
              'angular-aria/angular-aria.js',
              'angular-material/angular-material.js',
              'angular-material/angular-material.scss'
            ],
            flatten: true
          }
        ]
      },
      roboto: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/roboto-fontface/fonts/',
            dest: 'www/fonts/roboto/',
            src: ['*.eot', '*.ttf', '*.woff', '*.woff2', '*.svg']
          },
          {
            expand: true,
            cwd: 'bower_components/roboto-fontface/css/',
            dest: 'www/roboto-fontface/',
            src: '*.scss'
          }
        ]
      },
      materialIcons: {
        expand: true,
        cwd: 'bower_components/material-design-icons/iconfont/',
        dest: 'www/fonts/material-icons/',
        src: ['*.eot', '*.ttf', '*.woff', '*.woff2', '*.svg']
      }
    },
    uglify: {
      options: {
        screwIE8: true,
        sourceMap: true
      },
      vendor: {
        files: {
          'www/angular.min.js': [
            'www/angular/angular.js',
            'www/angular/angular-route.js',
            'www/angular/angular-resource.js',
            'www/angular/angular-animate.js',
            'www/angular/angular-aria.js',
            'www/angular/angular-material.js'
          ]
        }
      },
      source: {
        files: {
          'www/index.min.js': [
            'www/ua-core/ua-core.js',
            'www/ua-*/**/*.js',
            'www/index.js'
          ]
        }
      },
      release: {
        options: {
          sourceMap: false
        },
        files: [
          '<%= uglify.vendor.files %>',
          '<%= uglify.source.files %>'
        ]
      },
      debug: {
        files: '<%= uglify.release.files  %>'
      }
    },
    sass: {
      options: {
        style: 'compressed',
        sourcemap: 'auto'
      },
      source: {
        files: {
          'www/index.min.css': 'www/index.scss'
        }
      },
      release: {
        options: {
          sourcemap: 'none'
        },
        files: '<%= sass.source.files %>'
      },
      debug: {
        files: '<%= sass.release.files %>'
      }
    },
    connect: {
      build: {
        options: {
					port: 8000,
					base: {
						path: 'www/',
						options: {
							index: 'index.html'
						}
					}
				}
      }
    },
    watch: {
			scripts: {
				files: 'source/**/*.js',
				tasks: [
          'copy:source',
          'uglify:source'
        ]
			},
      styles: {
				files: 'source/**/*.scss',
				tasks: [
          'copy:source',
          'sass:source'
        ]
			},
      templates: {
        files: 'source/**/*.html',
        tasks: [
          'copy:source'
        ]
      }
		}
  });

  grunt.registerTask('build', [
    'copy', 'uglify', 'sass'
  ]);

  grunt.registerTask('debug', [
    'clean:preBuild', 'copy', 'uglify:debug', 'sass:debug'
  ]);

  grunt.registerTask('release', [
    'clean:preBuild', 'copy', 'uglify:release', 'sass:release', 'clean:postBuild'
  ]);

  grunt.registerTask('dev', [
    'debug', 'connect', 'watch'
  ]);

  grunt.registerTask('default', [
    'release'
  ]);
};
