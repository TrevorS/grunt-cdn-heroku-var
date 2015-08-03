/*
 * grunt-universal-cdnify
 * https://github.com/TrevorS/grunt-universal-cdnify
 *
 * Copyright (c) 2015 Trevor Strieber
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    cdn_heroku_var: {
      options: {
        bower_location: 'test/bower.json',
        heroku_app_name: 'tsf-pix-beta',
        templates: {
          'jquery': [{
            url_template: '//cdnjs.cloudflare.com/ajax/libs/jquery/{{VERSION}}/jquery.min.js',
            type: 'js'
          }],
          'angular': [{
            url_template: '//cdnjs.cloudflare.com/ajax/libs/angular.js/{{VERSION}}/angular.min.js',
            type: 'js'
          }],
          'angular-resource': [{
            url_template: '//cdnjs.cloudflare.com/ajax/libs/angular.js/{{VERSION}}/angular-resource.min.js',
            type: 'js'
          }],
          'angular-route': [{
            url_template: '//cdnjs.cloudflare.com/ajax/libs/angular.js/{{VERSION}}/angular-route.min.js',
            type: 'js'
          }],
          'angular-sanitize': [{
            url_template: '//cdnjs.cloudflare.com/ajax/libs/angular.js/{{VERSION}}/angular-sanitize.min.js',
            type: 'js'
          }],
          'angular-touch': [{
            url_template: '//cdnjs.cloudflare.com/ajax/libs/angular.js/{{VERSION}}/angular-touch.min.js',
            type: 'js'
          }],
          'bootstrap-sass-official': [
            {
              url_template: '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/{{VERSION}}/css/bootstrap.css',
              type: 'css'
            },
            {
              url_template: '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/{{VERSION}}/js/bootstrap.js',
              type: 'js'
            }
          ],
          'components-font-awesome': [{
            url_template: '//cdnjs.cloudflare.com/ajax/libs/font-awesome/{{VERSION}}/css/font-awesome.min.css',
            type: 'css'
          }]
        }
      }
    },
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'clean', 'cdn_heroku_var']);
};
