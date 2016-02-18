(function(){
  angular
  .module('gitIssueViewer')
  .controller('DashboardController',DashboardController);

  DashboardController.$inject = ['$scope','CONF', 'httpUtil', '$rootScope'];

  function DashboardController($scope, CONF, httpUtil, $rootScope){
    console.log('Into the Login controller :' +  CONF.baseUrl);

    //Initialize repo dropdown
    fetchRepo();
    
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
          console.error("Error while fetching the reposeteries");
          return;
        }
        $scope.repos = response.data;
      });
    }
  }
})();
