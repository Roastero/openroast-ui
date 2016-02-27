/*jslint node: true */
"use strict";


module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/app/*.js', 'src/app/controllers/*.js', 'src/app/libs/*.js'],
        dest: '.tmp/built.js',
      },
    }, 

    uglify: {
      dist: {
        files: {
          'dist/js/app.min.js': [ '.tmp/built.js' ]
        },
        options: {
          mangle: false
        }
      }
    },

    copy: {
      main: {
        files: [
          {src: 'src/index.html', dest: 'dist/index.html', filter: 'isFile'},
          {src: 'node_modules/angular/angular.min.js', dest: 'dist/js/angular.min.js', filter: 'isFile'},
          {src: 'node_modules/angular-route/angular-route.min.js', dest: 'dist/js/angular-route.min.js', filter: 'isFile'},
          {src: 'node_modules/jquery/dist/jquery.min.js', dest: 'dist/js/jquery.min.js', filter: 'isFile'},
          {src: 'node_modules/jquery.scrollex/jquery.scrollex.min.js', dest: 'dist/js/jquery.scrollex.min.js', filter: 'isFile'},
          {src: 'node_modules/jquery.scrolly/jquery.scrolly.js', dest: 'dist/js/jquery.scrolly.js', filter: 'isFile'},
          {src: 'node_modules/skel-framework/dist/skel.min.js', dest: 'dist/js/skel.min.js', filter: 'isFile'},
          {src: 'src/app/partials', dest: 'dist/partials'},
          {src: 'src/assets', dest: 'dist/assets'},
        ],
      },
    },
    
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'dist/css/style.min.css': 'src/sass/style.scss'
        }
      }
    },

    clean: {
      dev: {
        src: [ '.tmp', 'dist' ]
      }
    },
    
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 3000,
          base: 'dist'
        }
      }
    },
    
    watch: {
      dev: {
        files: [ 'Gruntfile.js', 'src/app/*.js', 'src/*.html', 'src/app/partials/*.html', 'src/sass/*.scss' ],
        tasks: [ 'clean:dev', 'concat:dist', 'uglify:dist', 'sass:dist', 'copy:main' ],
        options: {
          atBegin: true
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  
  grunt.registerTask('serve', [ 'connect:server', 'watch:dev' ]);
  grunt.registerTask('build', [ 'clean:dev', 'concat:dist', 'uglify:dist', 'sass:dist', 'copy:main' ]);
};
