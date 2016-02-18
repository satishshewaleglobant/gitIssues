(function(){
  angular
  .module('gitIssueViewer')
  .controller('DashboardController',DashboardController);

  DashboardController.$inject = ['$scope','CONF', 'httpUtil'];

  function DashboardController($scope, CONF, httpUtil){
    console.log('Into the Login controller :' +  CONF.baseUrl);
  }
})();
