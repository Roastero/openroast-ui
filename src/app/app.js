var app = angular.module('openroastApp', ['ngRoute']);

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }
]);

app.config(['$routeProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'MainController'
      })
      .when('/recipes', {
        templateUrl: 'partials/recipe-list.html',
        controller: 'RecipeListController'
      });

    $locationProvider.html5Mode(true);
}]);

app.controller('MainController', function($scope) {
  $scope.message = 'Everyone come and see how good I look!';
});

app.controller('RecipeListController', ['$scope', '$http', 
  function ($scope, $http) {
    $http.get('https://api.openroast.org/v1/recipes').success(function(data) {
      $scope.recipes = data['data'];
    });
}]);
