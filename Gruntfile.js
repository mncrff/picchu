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
                    dest: 'dist',
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
  }

});

    // Load Grunt modules
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Set Grunt tasks
    grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin']);
}
