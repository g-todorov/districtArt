module.exports = function(grunt) {

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {
      eslint: 'gruntify-eslint'
    });

    grunt.initConfig({
      pkg : grunt.file.readJSON('package.json'),
      nodemon : {
        script : 'app.js'
      },
      eslint: {
        src: ['.'],
        options: {
          configFile: ".eslintrc.json"
        }
      }
    });

    grunt.registerTask('lint', ['eslint'])
    grunt.registerTask('default', ['nodemon']);
};
