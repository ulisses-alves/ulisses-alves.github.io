module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: {
      preBuild: {
        expand: true,
        cwd: 'bin/',
        src: '**/*'
      },
      postBuild: {
        expand: true,
        cwd: 'bin/',
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
        cwd: 'lib/',
        dest: 'bin/',
        src: '**/*'
      },
      angular: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/',
            dest: 'bin/angular/',
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
            dest: 'bin/fonts/roboto/',
            src: ['*.eot', '*.ttf', '*.woff', '*.woff2', '*.svg']
          },
          {
            expand: true,
            cwd: 'bower_components/roboto-fontface/css/',
            dest: 'bin/roboto-fontface/',
            src: '*.scss'
          }
        ]
      },
      materialIcons: {
        expand: true,
        cwd: 'bower_components/material-design-icons/iconfont/',
        dest: 'bin/fonts/material-icons/',
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
          'bin/angular.min.js': [
            'bin/angular/angular.js',
            'bin/angular/angular-route.js',
            'bin/angular/angular-resource.js',
            'bin/angular/angular-animate.js',
            'bin/angular/angular-aria.js',
            'bin/angular/angular-material.js'
          ]
        }
      },
      source: {
        files: {
          'bin/index.min.js': [
            'bin/ua-core/ua-core.js',
            'bin/ua-*/**/*.js',
            'bin/index.js'
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
          'bin/index.min.css': 'bin/index.scss'
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
          port: process.env.PORT || 3000,
          base: {
            path: 'bin/',
            options: {
              index: 'index.html'
            }
          }
        }
      }
    },
    watch: {
      scripts: {
        files: 'lib/**/*.js',
        tasks: [
          'copy:source',
          'uglify:source'
        ]
      },
      styles: {
        files: 'lib/**/*.scss',
        tasks: [
          'copy:source',
          'sass:source'
        ]
      },
      templates: {
        files: 'lib/**/*.html',
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

  grunt.registerTask('start', [
    'connect', 'watch'
  ]);

  grunt.registerTask('default', [
    'release'
  ]);
};
