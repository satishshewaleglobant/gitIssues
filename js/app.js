(function(){
  angular.module("gitIssueViewer", ['ngRoute'])
  .config(function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'templates/login.html',
        controller : 'LoginController',
        controllerAs : 'lg'
      })
      .when('/dashboard', {
        templateUrl: 'templates/dashboard.html',
        controller : 'DashboardController',
        controllerAs : 'dg'
      });
  })
  .constant('CONF',{
    baseUrl : 'https://api.github.com',
    user : '/user',
    users : '/users'
  });
})();
