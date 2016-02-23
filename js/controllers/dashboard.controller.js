(function(){
  angular
  .module('gitIssueViewer')
  .controller('DashboardController',DashboardController);

  DashboardController.$inject = ['$scope','CONF', 'httpUtil', '$rootScope','$window','sessionFactory','$location'];

  function DashboardController($scope, CONF, httpUtil, $rootScope, $window, sessionFactory, $location){
    $scope.issueData = [];
    $scope.repoName = null;
    $scope.loading= false;

    if(sessionFactory.initSession()){
      fetchRepo();
      var temp = $location.search().repoName;
      if(temp){
        $scope.repoName = temp;
        $scope.issueUrl = CONF.baseUrl+CONF.repos+ '/'+ $rootScope.username +'/'+ $scope.repoName + CONF.issues;
      }
    };

    /**
    * Function use to fetch all available reposetirs to users
    */
    function fetchRepo(){

      var params = {
        url : CONF.baseUrl + CONF.users + '/'+ $rootScope.username +'/repos',
        method : 'GET',
        headers: {'Content-Type': 'application/json'}
      };
      console.log('params : ', params);

      httpUtil.makeCall(params,function(err, response){

        console.log("err ", err);
        console.log("response : ", response);

        if(err || !response || !response.data){
          //show error message
          console.log("Error while fetching the reposeteries");
          return;
        }
        $scope.repos = response.data;
      });
    }

    $scope.dropdownClick = function(name){
      $scope.repoName = name;
      $scope.issueUrl = CONF.baseUrl+CONF.repos+ '/'+ $rootScope.username +'/'+ name + CONF.issues;
      $location.search({'repoName' : name});
    };

    $scope.closeIssue = function(issueNumber){

      console.log("came into close issue ");

      $scope.loading= true;
      var url  = (CONF.baseUrl + CONF.repos  + '/' + $rootScope.username + '/' + $scope.repoName + CONF.issues + "/" + issueNumber);
      var data = {
        state : 'close',
      };
      var params = {
        url : url,
        method : 'PATCH' ,
         data: JSON.stringify(data),
        headers: {'Content-Type': 'application/json','Authorization' : $rootScope.authKey }
      };

        httpUtil.makeCall(params,function(err, response){
          $scope.loading = false;
          if(err || !response || !response.data){
            //show error message
            console.error("Error while Authentication");
            return;
          };
          $scope.issueUrl = CONF.baseUrl+CONF.repos+ '/'+ $rootScope.username +'/'+ $scope.repoName + CONF.issues;
        });
    };
  }
})();
