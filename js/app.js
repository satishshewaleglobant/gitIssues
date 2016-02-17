(function(){
  angular.module("gitIssueViewer", ['ngRoute'])
  .config(function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'templates/login.html',
        controller : 'LoginController',
        controllerAs : 'lg'
      });
  })
  .constant('CONF',{
    baseUrl : '/api'
  });
})();
