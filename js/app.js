/* App Module */

var app = angular.module('marvelReviews', [
  'ngRoute',
    'fbs',
  'marvelAnimations',
  'marvelControllers',
  'marvelServices',
  'marvelComments',
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/movies', {
        templateUrl: 'partials/movie-list.html',
        controller: 'MarvelListCtrl'
      }).
      when('/movies/:movieId', {
        templateUrl: 'partials/movie-single.html',
        controller: 'MarvelDetailCtrl'
      }).
      otherwise({
        redirectTo: '/movies'
      });
  }]);

app.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://www.youtube.com/**'
  ]);

  // The blacklist overrides the whitelist so the open redirect here is blocked.
  $sceDelegateProvider.resourceUrlBlacklist([
    '/index.html#/movies/**'
  ]);
});

