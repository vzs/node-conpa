module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        concat: {
            vendor: {
                src: [
                    'lib/public/ConPA/assets/js/jquery-1.10.2.min.js',
                    'lib/public/ConPA/assets/js/jquery.pubsub-0.7.min.js',
                    'lib/public/ConPA/assets/js/jquery.sparkline-2.1.2.min.js',
                    'lib/public/ConPA/assets/js/jquery.localstorage-0.1.js',
                    'lib/public/ConPA/assets/js/lodash-1.3.1.min.js',
                    'lib/public/ConPA/assets/js/bootstrap-2.3.1.min.js'
                ],
                dest: 'lib/public/ConPA/build/vendor.js'
            },
            dist: {
                src: [
                    'lib/public/ConPA/js/errorMessage.js',
                    'lib/public/ConPA/js/portfolioDashboard.js',
                    'lib/public/ConPA/js/portfolioCRM.js',
                    'lib/public/ConPA/js/portfolioOptimization.js',
                    'lib/public/ConPA/js/assetStats.js',
                    'lib/public/ConPA/js/assetList.js',
                    'lib/public/ConPA/js/assetSearch.js',
                    'lib/public/ConPA/js/appUtil.js',
                    'lib/public/ConPA/js/app.js'
                ],
                dest: 'lib/public/ConPA/build/conpa.js'
            }
        },

        jshint: {
            backend: [
                'lib/conpa.js'
            ],
            before: ['<%= concat.dist.src %>'],
            after: ['<%= concat.dist.dest %>'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        uglify: {
            dist: {
                src: ['lib/public/ConPA/build/conpa.js'],
                dest: 'lib/public/ConPA/build/conpa.min.js'
            }
        },

        shell: {
            remove: {
                command: 'npm rm conpa'
            },
            install: {
                command: 'npm install ../../../node-conpa'
            },
            options: {
                execOptions: {
                    cwd: '../z/nodester/conpa/'
                },
                stdout: true
            }
        },

        watch: {
            files: [
                'lib/**/*.js',
                'lib/**/*.html',
                'lib/**/*.css'
            ],
            tasks: [
                'default'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default', [
        'jshint:backend',
        'jshint:before',
        'concat',
        'jshint:after',
        'uglify',
        'shell',
        'watch'
    ]);
};
