(function(){
  angular
  .module('gitIssueViewer')
  .controller('LoginController',LoginController);

  LoginController.$inject = ['$scope','CONF', 'httpUtil'];

  function LoginController($scope, CONF, httpUtil){
    console.log('Into the Login controller :' +  CONF.baseUrl);
    var vm = this;

    $scope.test  = "djfdfjdfdjf";

    $scope.submitClicked = function(){
      console.log("Username  : " + this.username);
      console.log("password : " + this.password);
      var params = {
        method : 'GET'
      }
      var data = {
        username : vm.username,
        password : vm.password
      }
      httpUtil.makeCall(params,data,function(err, response){

        if(err){
          //show error message
          console.error("Error while Authentication");
          return;
        }

        if (response) {
          console.log("Login success");
        }
      })
    }
  }
})();
