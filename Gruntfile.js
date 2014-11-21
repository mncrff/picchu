module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Compile css/*.scss Sass files
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    map: false
                },
                files: [{
                    expand: true,
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },

        autoprefixer: {
            options: {
                map: false
            },
            dist: {
                files: {
                    'css/picchu.css': 'css/picchu.css'
                }
            }
        }

    });

    // Load Grunt modules
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');

    // Set Grunt tasks
    grunt.registerTask('default', ['sass', 'autoprefixer']);
}
