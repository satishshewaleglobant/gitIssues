(function(){
  angular.module('gitIssueViewer')
  .service('sessionFactory', sessionFactory);

  sessionFactory.$inject  = ['$rootScope','$window'];

  function sessionFactory($rootScope, $window){

    var factory ={};

    factory.set = function(key,value){
      sessionStorage[key] = value;
    }

    factory.get = function(key){
      return sessionStorage[key];
    }

    factory.initSession = function(params){
      sessionStorage.data = params;
    };

    factory.destroySession = function(){
      sessionStorage.data = null;
    };

    factory.restoreRootFromSession = function(){
      $rootScope.authKey = sessionStorage.authKey;
      $rootScope.username = sessionStorage.username;

      console.log("restoring...");
    };

    factory.validateSession  = function(){

    //  console.log(if(sessionStorage && sessionStorage.username && sessionStorage.authKey){});
      return (sessionStorage && sessionStorage.username && sessionStorage.authKey) ? true  : false;
      // {
      //   $window.location.href = '#/';
      // }else{
      //   return true;
      // }
    };
    return factory;
  }
})();
