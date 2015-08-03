# grunt-cdn-heroku-var

> Generate CDN information from Bower and save it in a Heroku environment variable.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-cdn-heroku-var --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-cdn-heroku-var');
```

## The "cdn_heroku_var" task

### Overview
In your project's Gruntfile, add a section named `cdn_heroku_var` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
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
      }
    }
  }
});
```
