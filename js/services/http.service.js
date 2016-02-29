(function() {
  'use strict'
  angular.module('gitIssueViewer')
    .service('httpUtil', httpUtil);

  httpUtil.$inject = ['$http'];

  function httpUtil($http) {
    this.makeCall = function(params, cb) {
      params.cache = false;
      $http(params).then(function mySucces(response) {
        cb(null, response);
      }, function myError(response) {
        cb(response.statusText);
      });
    }
  }
})();
