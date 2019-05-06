module.exports = function (grunt) {
    pkg: grunt.file.readJSON('package.json'),
    grunt.initConfig({
        watch: {
            sass: {
                files: ['src/sass/**/*.scss'],
                tasks: ['sass'],
            },
            js : {
                files: ['src/js/**/*.{js,jsx}'],
                tasks: ['browserify'],
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
            build: {
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
            }
        },
        uglify: {
            options: {
                compress: true
            },
            build: {
                files: {
                    'build/js/main.min.js': ['build/js/main.js' ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['sass', 'browserify', 'watch']);
    grunt.registerTask('dist', ['sass', 'browserify', 'uglify', 'cssmin']);

};