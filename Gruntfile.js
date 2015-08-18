module.exports = function (grunt) {
    require('time-grunt')(grunt);

    // Load Grunt modules
    require('load-grunt-tasks')(grunt);

    // assets to package
    var assetLists = {
        dist: [
            'bower_components/modernizr/modernizr.js',
            'src/FormElements/formElements.js'
        ]
    };
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Compile css/*.scss Sass files
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    map: false
                },
                files: {
                    'dist/picchu.css': 'src/picchu.scss'
                }
            }
        },

        autoprefixer: {
            options: {
                map: false
            },
            dist: {
                files: {
                    'dist/picchu.css': 'dist/picchu.css'
                }
            }
        },

        cssmin: {
            target: {
                files: {
                    'dist/picchu.min.css': 'dist/picchu.css'
                }
            }
        },

        concat: {
            options: {
                separator: ';',
                stripBanners: true
            },
            dist: {
                src: ['bower_components/modernizr/modernizr.js', 'src/FormElements/formElements.js'],
                dest: 'dist/picchu.js'
            }
        }
    });

    // Set Grunt tasks
    grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'concat']);

};
