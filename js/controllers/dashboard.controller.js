(function(){
  angular
  .module('gitIssueViewer')
  .controller('DashboardController',DashboardController);

  DashboardController.$inject = ['$scope','CONF', 'httpUtil', '$rootScope','$window','sessionFactory'];

  function DashboardController($scope, CONF, httpUtil, $rootScope, $window, sessionFactory){
    console.log('Into the Login controller :' +  CONF.baseUrl);
    $scope.issueData = [];
    $scope.repoName = null;

    if(sessionFactory.initSession()){
      fetchRepo();
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
      sessionFactory.set('repoName', name);
      $scope.issueUrl = CONF.baseUrl+CONF.repos+ '/'+ $rootScope.username +'/'+ name + CONF.issues;
    };

    $scope.editIssue = function(issueNumber){
      $window.location.href='#addIssue?issueNumber='+issueNumber;
    };
  }
})();
