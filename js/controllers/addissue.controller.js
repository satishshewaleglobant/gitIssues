(function(){
  angular
  .module('gitIssueViewer')
  .controller('AddissueController',AddissueController);

  AddissueController.$inject = ['$scope','CONF', 'httpUtil','$rootScope', '$location', '$window', 'sessionFactory'];

  function AddissueController($scope, CONF, httpUtil,$rootScope, $location , $window , sessionFactory){
      sessionFactory.initSession();
      var issueNumber = $location.search().issueNumber;
      $scope.edittable = issueNumber ? true  : false;
      var url  = (CONF.baseUrl + CONF.repos  + '/' + $rootScope.username + '/' + sessionFactory.get('repoName') + CONF.issues) + ($scope.edittable ? ("/" + issueNumber) : '');

      if(issueNumber){
          $scope.issueUrl = url;
      };

      $scope.createIssue = function(){
        var data = {
          title : $scope.title,
          body : $scope.description
        };
        var params = {
          url : url,
          method : $scope.edittable ? 'PATCH' : 'POST',
           data: JSON.stringify(data),
          headers: {'Content-Type': 'application/json','Authorization' : $rootScope.authKey }
        };

          console.log('params : ', params);

          httpUtil.makeCall(params,function(err, response){

            console.log("err ", err);
            console.log("response : ", response);

            if(err || !response || !response.data){
              //show error message
              console.error("Error while Authentication");
              return;
            };

            $window.location.href='#/dashboard';
          });
      }

      //watch changes for issue data change for update
      $scope.$watch('issueData',function(newValue,oldValue){

          if(newValue && newValue !== oldValue){
            bindDatavalue(newValue);
          }
      });

      function bindDatavalue(obj){

        if(!obj || typeof obj !== 'object'){
          return;
        }
        //bind all model varibles here
        $scope.title = obj.title;
        $scope.description = obj.body;
      }
    }
})();
