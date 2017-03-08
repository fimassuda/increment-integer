module.exports = function (grunt) {
  grunt.initConfig({
    jsdoc: {
      dist: {
        src: ['src/*.js'],
        options: {
          destination: 'doc',
        },
      },
    },
    eslint: {
      options: {
        root: true
      },
      target: ['src/**/*.js'],
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quite: true,
          clearRequireCache: false,
          noFail: false,
          timeout: 30000,
        },
        src: ['test/**/*.js'],
      },
    },

    watch: {
      js: {
        files: ['src/**/*.js', 'test/**/*.js'],
        tasks: ['eslint']
      }
    },
    nodemon: {
      dev: {
        script: 'src/server.js'
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    }

  })

  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', ['concurrent']);
  grunt.registerTask('test', 'mochaTest');
  grunt.registerTask('doc', 'jsdoc');
};
