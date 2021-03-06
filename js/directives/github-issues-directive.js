(function() {
  'use strict'
  angular.module('gitIssueViewer')
    .directive('githubIssuesDirective', githubIssuesDirective);

  githubIssuesDirective.$inject = ['httpUtil'];

  function githubIssuesDirective(httpUtil) {
    return {
      restrict: 'EA',
      scope: {
        url: '=githubIssuesDirective',
        data: "=",
        spinner: "="
      },
      link: linkFunction
    };

    //linking function for directive
    function linkFunction($scope, $el, $attr) {

      function fetchIssues(issueUrl) {

        $scope.spinner = true;
        var params = {
          url: issueUrl,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          cache: false
        };

        httpUtil.makeCall(params, function(err, response) {
          $scope.spinner = false;
          if (err || !response || !response.data) {
            //show error message
            console.error("Error while fetching the reposeteries");
            return;
          }
          $scope.data = response.data;
        });
      }

      /**
       * watch url for changes
       */
      $scope.$watch('url', function(newValue, oldValue) {
        if (newValue) {
          fetchIssues(newValue);
        }
      });
    }
  }
})();
