(function(){
  angular.module('gitIssueViewer')
  .directive('headerDirective',headerDirective);

  headerDirective.$inject = ['$window','sessionFactory'];

  function headerDirective($window, sessionFactory){
    return {
      restrict : 'AE',
      templateUrl : 'templates/header.html',
      link : linkFunction
    };

    //linking function for directive
    function linkFunction($scope, $el, $attr){

      //write logic to destroy session and navigate to login page
      $scope.logout = function(){
        sessionFactory.destroySession();
        $window.location.href='#/';
      }
      
      if(sessionFactory.validateSession()){
        sessionFactory.restoreRootFromSession();
      }else {
        $scope.logout();
      };
    }
  }
})();
