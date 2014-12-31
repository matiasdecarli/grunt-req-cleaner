/*
 * grunt-req-cleaner
 * https://github.com/matiasdecarli/grunt-req-cleaner
 *
 * Copyright (c) 2014 Matias De Carli
 * Licensed under the MIT license.
 */

'use strict';

var async = require('async'),
    fs = require('fs');

module.exports = function(grunt) {

  grunt.registerMultiTask('req_cleaner', 'A grunt task to clean all unused require()', function() {
      var done = this.async();  
      var files = this.files;                

      async.each(files, function (item){
        processFile(fs.readFileSync(item.src.toString(), 'UTF-8'))
      }, done());
  });

  function processFile(contents){
    //magic to come
  }

};
