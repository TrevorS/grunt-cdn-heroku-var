/*
 * grunt-universal-cdnify
 * https://github.com/TrevorS/grunt-universal-cdnify
 *
 * Copyright (c) 2015 Trevor Strieber
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerTask('cdn_heroku_var', 'Insert CDN mappings into a Heroku environment variable.', function() {

    var bower  = require('bower'),
        semver = require('semver'),
        exec   = require('child_process').execSync,
        done   = this.async();

    var options = this.options({
      bower_location: 'bower.json'
    });

    var dependencies = grunt.file.readJSON(options.bower_location).dependencies,
        packageNames = Object.keys(dependencies);

    function getVersion(names, versions) {
      if (names.length <= 0) {
        insertHerokuVariable(versions);
        done();
        return;
      }

      var name = names.pop();
      var vsns = versions || {};

      bower.commands.info(name).on('end', function(data) {
        vsns[name] = semver.maxSatisfying(data.versions, dependencies[name]);

        getVersion(names, vsns);
      });
    }

    function insertHerokuVariable(versions) {
      var herokuVariable = [];
      for (var name in versions) {
        var version = versions[name];
        var details = options.templates[name];

        for (var i in details) {
          var detail = details[i];

          herokuVariable.push({
            url: detail.url_template.replace('{{VERSION}}', version),
            type: detail.type
          });
        }
      }
      var variable = JSON.stringify(herokuVariable);
      setHerokuVariable(variable);
    }

    function setHerokuVariable(variable) {
      var cmd = herokuCommand(variable, options.heroku_app_name);

      exec(cmd, function(error, stdout, stderr) {
        if (error !== null) {
          grunt.log.error('Error setting the Heroku variable: ', error);
        }
      });
    }

    function herokuCommand(variable, appName) {
      return "heroku config:set CDN_DETAILS='" + variable + "' --app " + appName;
    }

    getVersion(packageNames);
  });
};
