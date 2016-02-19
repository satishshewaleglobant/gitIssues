(function(){
  angular
  .module('gitIssueViewer')
  .controller('AddissueController',AddissueController);

  AddissueController.$inject = ['$scope','CONF', 'httpUtil','$rootScope', '$location'];

  function AddissueController($scope, CONF, httpUtil,$rootScope,$location){
    console.log( "location search : " + $location.search().name);

      $scope.createIssue = function(){
        var data = {
          title : $scope.title
        }

        console.log("title : " +  $scope.title);

        var params = {
          url : CONF.baseUrl + CONF.repos  + '/' + $rootScope.username + '/' + $rootScope.repoName + CONF.issues,
          method : 'POST',
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
            }

            $window.location.href='#/dashboard';
          });
      }
    }
})();
