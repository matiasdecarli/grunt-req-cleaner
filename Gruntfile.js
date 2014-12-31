/*
 * grunt-req-cleaner
 * https://github.com/matiasdecarli/grunt-req-cleaner
 *
 * Copyright (c) 2014 Matias De Carli
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

// Project configuration.
  grunt.initConfig({
    // Configuration to be run (and then tested).
    'req_cleaner': {
        options: {
        }, 
        build: {
            src: [                    
                'test_files/*.js'                
            ],            
            expand: true,
            filter: 'isFile',
        }
      }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['req_cleaner']);

};
