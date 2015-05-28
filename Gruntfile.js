module.exports = function (grunt) {
    require('time-grunt')(grunt);

    // Load Grunt modules
    require('load-grunt-tasks')(grunt);
    
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
                    src: ['src/*.scss'],
                    dest: '../dist',
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

    // Set Grunt tasks
    grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin']);
}
