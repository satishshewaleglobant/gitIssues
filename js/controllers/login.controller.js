(function() {
  angular
    .module('gitIssueViewer')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope', 'CONF', 'httpUtil', '$rootScope', '$window', 'sessionFactory', '$location'];

  function LoginController($scope, CONF, httpUtil, $rootScope, $window, sessionFactory, $location) {
    //console.log('Into the Login controller :' +  CONF.baseUrl);
    var vm = this;

    $scope.username = "";
    $scope.password = "";

    $scope.submitClicked = function() {

      var encodedString = 'Basic ' + btoa(this.username + ':' + this.password);
      var params = {
        url: CONF.baseUrl + CONF.user,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': encodedString
        }
      };

      httpUtil.makeCall(params, function(err, response) {

        console.log("err ", err);
        console.log("response : ", response);

        if (err || !response || !response.data) {
          //show error message
          console.error("Error while Authentication");
          return;
        }

        var data = response.data;
        sessionFactory.set('username', data.login);
        sessionFactory.set('authKey', encodedString);
        $location.url('/dashboard');
      });
    }
  }
})();
