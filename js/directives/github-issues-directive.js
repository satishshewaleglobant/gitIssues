(function(){
  angular.module('gitIssueViewer')
  .directive('githubIssuesDirective',githubIssuesDirective);

  githubIssuesDirective.$inject = ['httpUtil'];

  function githubIssuesDirective(httpUtil){
    return {
      restrict : 'EA',
      scope : {
        url : '=githubIssuesDirective'
      },
      link : linkFunction
    };

    //linking function for directive
    function linkFunction($scope, $el, $attr){

      function fetchIssues(issueUrl){

        var params = {
          url : issueUrl,
          method : 'GET',
          headers: {'Content-Type': 'application/json'}
        };

        httpUtil.makeCall(params,function(err, response){

          console.log("err ", err);
          console.log("response : ", response);

          if(err || !response || !response.data){
            //show error message
            console.error("Error while fetching the reposeteries");
            return;
          }
          $scope.issueData = response.data;
        });
      }

      /**
      * watch url for changes
      */
      $scope.$watch('url',function(newValue,oldValue){

        if(newValue && newValue !== oldValue){
          fetchIssues(newValue);
        }
      });
    }
  }
})();