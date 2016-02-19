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
      })
      .when('/addIssue', {
        templateUrl: 'templates/addIssue.html',
        controller : 'AddissueController',
        controllerAs : 'ac'
      });
  })
  .constant('CONF',{
    baseUrl : 'https://api.github.com',
    user : '/user',
    users : '/users',
    repos : '/repos',
    issues : '/issues'
  });
})();
