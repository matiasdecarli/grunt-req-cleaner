/*
 * grunt-req-cleaner
 * https://github.com/matiasdecarli/grunt-req-cleaner
 *
 * Copyright (c) 2014 Matias De Carli
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var fileTarget = '.target'

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
    },
    prompt: {
      target: {
        options: {
          questions: [
            {
              config: 'config.name',
              type: 'checkbox',
              message: 'Select requires to delete...', 
              default: 'value',
              choices: function(){
                  return fs.readFileSync(fileTarget, 'UTF-8').toString().split("\n");                  
              }
            }
          ]
        }
      },
    }    
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-prompt');

  // By default, lint and run all tests.  
  grunt.registerTask('default', ['req_cleaner']);
};
