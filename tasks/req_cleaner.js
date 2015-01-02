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

      async.each(this.files, function (item){
        processFile(fs.readFileSync(item.src.toString(), 'UTF-8').toString().split("\n"), item.src.toString());
      }, done());
  });

  function processFile(contents, fileName){
    var requires = [];
    var lineNumber = 0;
    var haveRequires = new RegExp(/^[^\/].*require\('/);                  //check if there a require() in line
    var filterRequire = new RegExp(/var(.*?)(.*?)(?==require\('|$)/i);    //leaves only the var name

    //1rst run to discover requires
    contents.forEach(function(line){
      if (haveRequires.test(line.replace(/ /g,''))){
        requires.push({
          require: filterRequire.exec(line.replace(/ /g,'').toString())[2],
          file: fileName,
          line: lineNumber++,
          exists: false
        });
       }
    });

    var regexRequire = "[^a-zA-Z0-9$_]R[^a-zA-Z0-9$_]";  //look for the require()
    if (requires.length>0){
      //2nd run to eliminate unused 
      for(var i=0; i<requires.length;i++){
        var containsRequire = new RegExp(regexRequire.replace("R",requires[i].require));
        for(var y=0;y<contents.length;y++){
          if ( (contents[y]) && (containsRequire.test(contents[y])) && (y>0) && (requires[i].line != y-1) ){
              requires[i].exists = true;
              break;
          }
        }
      }
    }

    var waste = [];
    requires.forEach(function(item){
      if (item.exists==false){   
        waste.push(item);
      }
    });

    if (waste.length>0){
      grunt.log.error('file', fileName, 'has', waste.length, 'unused requires');
    }
    else{
      console.log('file', fileName, 'has no unused requires');
    }
  }
};