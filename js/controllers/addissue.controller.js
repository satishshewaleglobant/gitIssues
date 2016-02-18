(function(){
  angular
  .module('gitIssueViewer')
  .controller('AddissueController',AddissueController);

  AddissueController.$inject = ['$scope','CONF', 'httpUtil','$rootScope', '$window'];

  function AddissueController($scope, CONF, httpUtil,$rootScope,$window){
      var  vm = this;

      $scope.createIssue = function(){
        var data = {
          title : vm.title
        }
          var params = {
            url : CONF.baseUrl + CONF.crateIssue  + '/' + $rootScope.username + '/' + $rootScope.repoName +'/issues',
            method : 'POST',
             data: JSON.stringify(data),
            headers: {'Content-Type': 'application/json','Authorization' : $rootScope.authKey }
          };
          // console.log('params : ', params);

          httpUtil.makeCall(params,function(err, response){

            console.log("err ", err);
            console.log("response : ", response);

            if(err || !response || !response.data){
              //show error message
              console.error("Error while Authentication");
              return;
            }

            var data  =  response.data;
            $rootScope.username = data.login;
            $rootScope.authKey = encodedString;
            $window.location.href='#/dashboard';
          });
      }
    }
  }
})();
