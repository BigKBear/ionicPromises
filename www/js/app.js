(function() {

var app = angular.module('app', ['ionic']);

app.controller('AppCtrl',function($q, $scope){

  function add(x,y) {
    var q = $q.defer();
    setTimeout(function(){
      var result = x + y;
      if (result >=  0){
        q.resolve(x + y);
      }else{
        q.reject ('negative value: ' + result);
      }
    },100);
    return q.promise;
  }

//Section 6 lecture 30 3:00
  var startTime = Date.now();
  add(5,2)
    .then(function(result) {
      return add(result, 3);
    })
    .then(function(result) {
      return add(result, 1);
    })
    .then(function(result) {
      return Array(result).join("*");
    })
    .then(function(result) {
      $scope.result = result;
    })
    .catch(function(failure){
       $scope.failure = failure;
    })
    .finally(function(){
      $scope.elapsedTime = Date.now() - startTime;
    });

  // add(5,2, function(result){
  //   add(result, 3, function(result){
  //     add(result, 1, function(result){
  //       $scope.result = result;
  //       $scope.elapsedTime = Date.now() - startTime;
  //     }, function(error){/*handel error*/});
  //   }, function(error){/*handel error*/});
  // }, function(error){/*handel error*/});

});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

}());