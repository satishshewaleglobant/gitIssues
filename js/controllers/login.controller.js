(function(){
  angular
  .module('gitIssueViewer')
  .controller('LoginController',LoginController);

  LoginController.$inject = ['$scope','CONF', 'httpUtil','$rootScope', '$window'];

  function LoginController($scope, CONF, httpUtil,$rootScope,$window){
    //console.log('Into the Login controller :' +  CONF.baseUrl);
    var vm = this;

    $scope.username = "satishewale@gmail.com";
    $scope.password = "sat22288318";

    $scope.submitClicked  = function(){
      // console.log("Username  : " + this.username);
      // console.log("password : " + this.password);
      // var params = {
      //     url: 'https://api.github.com/repos/satishewale/WoW/issues',
      //     method: 'POST',
      //     data: JSON.stringify({ title : "This is through login"}),
      //     headers: {'Content-Type': 'application/json','Authorization' : 'Basic c2F0aXNoZXdhbGU6c2F0MjIyODgzMTg=' }
      // };

      var encodedString = 'Basic '+ btoa(this.username+':'+this.password);
      var params = {
        url : CONF.baseUrl + CONF.user,
        method : 'GET',
        headers: {'Content-Type': 'application/json','Authorization' : encodedString }
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
      })
    }
  }
})();
