module.exports = function(grunt){
    "use strict";

    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);
    require('jit-grunt')

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'public/bower_components/jquery/dist/jquery.js',
                    'public/js/*.js'
                ],
                dest: 'public/dist/scripts.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'public/dist/app.js': ['public/dist/app.js']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'public/js/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        compass: {
            compassCompile: {
                options: {
                    sassDir: 'public/sass',
                    cssDir: 'public/css',
                    cacheDir: 'public/.sass-cache',
                    force: true
                }
            },
            server: {
                options: {
                    sassDir: 'public/sass',
                    cssDir: 'public/css',
                    cacheDir: 'public/.sass-cache',
                    force: true,
                    watch: true
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'public/dist/styles.min.css' : ['public/css/**/*.css']
                }
            }
        },
        clean: {
            dist: {
                src: ['public/dist/*']
            }
        },
        watch: {
            css: {
                files: 'public/sass/**/*.scss',
                tasks: ['compassCompile']
            },
            livereload: {
                options: {
                    livereload: 35729
                },
                files: ['public/js/**/*.js'],
                tasks: ['browserify']
            }
        },
        browserify: {
          dist: {
            files: {
              'public/dist/app.js': ['public/js/main.js']
            },
          }
        },
        connect: {
            serverLive: {
                options: {
                    port: 8000,
                    hostname: '*',
                    livereload: 35729,
                    base: {
                        path: 'public/',
                        index: 'index.html'
                    },
                    open: true
                }
            },
            serverStatic: {
                options: {
                    port: 8000,
                    hostname: '*',
                    livereload: false,
                    base: {
                        path: 'public/',
                        index: 'index.html'
                    },
                    open: true
                }
            }
        }
    });

    //TODO: creating appropiate HTML file
    grunt.registerTask('dist', [
        'clean',
        'compass:compassCompile',
        'cssmin',
        //'jshint',
        'concat',
        //'uglify'
    ]);

    grunt.registerTask('compassCompile', [
        'compass:compassCompile'
    ]);

    grunt.registerTask('server', [
        'compass:compassCompile',
        'connect:serverStatic',
        'compass:server'
    ]);

    grunt.registerTask('serverLive', [
        'connect:serverLive',
        'watch'
    ]);

    grunt.registerTask('build', ['browserify','uglify'])

    grunt.loadNpmTasks('grunt-browserify')
    grunt.loadNpmTasks('grunt-contrib-uglify')
};
