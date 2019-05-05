module.exports = function (grunt) {

    grunt.initConfig({
        watch: {
            sass: {
                files: ['src/sass/**/*.scss'],
                tasks: ['sass'],
            },
            js : {
                files: ['src/js/**/*.{js,jsx}'],
                tasks: ['browserify:dev'],
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: { 'build/css/main.css': 'src/sass/main.scss'}
            }
        },
        cssmin: {
            target: {
                files:
                    [
                        {
                            expand: true,
                            cwd: 'build/css',
                            src: ['*.css', '!*.min.css'],
                            dest: 'build/css',
                            ext: '.min.css'
                        }
                    ]
            }
        },
        browserify: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'src/js',
                    src: ['main.js'],
                    dest: 'build/js',
                    ext: ".js"
                }],
                options: {
                    transform: [
                        ["babelify", { 
                                "presets": ["@babel/preset-env", "@babel/preset-react"] 
                        }]
                    ],
                    browserifyOptions: {
                        debug: true
                    }
                }
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/js',
                    src: ['main.js'],
                    dest: 'build/js',
                    ext: ".min.js"
                }],
                options: {
                    transform: [
                        ["babelify", {
                            "presets": ["@babel/preset-env", "@babel/preset-react"]
                        }],
                        'uglifyify'
                    ],
                    browserifyOptions: {
                        debug: true
                    }, 
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('babelify');

    grunt.registerTask('default', ['sass', 'browserify:dev', 'watch']);
    grunt.registerTask('dist', ['sass', 'browserify:dist', 'cssmin']);

};