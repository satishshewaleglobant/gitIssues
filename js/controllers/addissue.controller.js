(function() {
  'use strict'
  angular
    .module('gitIssueViewer')
    .controller('AddissueController', AddissueController);

  AddissueController.$inject = ['$scope', 'CONF', 'httpUtil', '$rootScope', '$location', '$window', 'sessionFactory'];

  function AddissueController($scope, CONF, httpUtil, $rootScope, $location, $window, sessionFactory) {
    sessionFactory.initSession();
    var vm = this;
    this.errorMessage = false;
    var issueNumber = $location.search().issueNumber;
    $scope.repoName = $location.search().repoName;
    $scope.edittable = issueNumber ? true : false;
    var url = (CONF.baseUrl + CONF.repos + '/' + $rootScope.username + '/' + $scope.repoName + CONF.issues) + ($scope.edittable ? ("/" + issueNumber) : '');
    $scope.loading = false;


    if (issueNumber) {
      $scope.issueUrl = url;
    };

    $scope.createIssue = function() {
      $scope.loading = true;
      var data = {
        title: this.title,
        body: this.description ? this.description : ''
      };

      console.log("data ", data);
      var params = {
        url: url,
        method: $scope.edittable ? 'PATCH' : 'POST',
        data: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': $rootScope.authKey
        }
      };

      console.log('params : ', params);

      httpUtil.makeCall(params, function(err, response) {

        console.log("err ", err);
        console.log("response : ", response);
        $scope.loading = false;

        if (err || !response || !response.data) {
          //show error message
          vm.errorMessage = true;
          vm.errorMessageText = err;
          console.error("Error while createIssue");
          return;
        };

        $window.location.href = '#/dashboard?repoName=' + $scope.repoName;
      });
    }

    //watch changes for issue data change for update
    $scope.$watch('issueData', function(newValue, oldValue) {

      if (newValue && newValue !== oldValue) {
        bindDatavalue(newValue);
      }
    });

    function bindDatavalue(obj) {

      if (!obj || typeof obj !== 'object') {
        return;
      }
      //bind all model varibles here
      $scope.title = obj.title;
      $scope.description = obj.body;
    }
  }
})();
